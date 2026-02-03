const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { nanoid } = require('nanoid');

const DB_PATH = path.join(__dirname, 'db.json');
const UPLOAD_DIR = path.join(__dirname, 'uploads');
const JWT_SECRET = process.env.JWT_SECRET || 'change-this-secret';

if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${nanoid(6)}${ext}`);
  }
});
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) return cb(new Error('Only images allowed')); 
    cb(null, true);
  }
});

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(UPLOAD_DIR));
app.use('/', express.static(path.join(__dirname)));

function readDB() {
  return JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
}
function writeDB(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

// Auth
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Missing credentials' });
  const db = readDB();
  const user = db.users.find(u => u.email === email);
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  if (!bcrypt.compareSync(password, user.passwordHash)) return res.status(401).json({ message: 'Invalid credentials' });
  const token = jwt.sign({ uid: user.id, email: user.email }, JWT_SECRET, { expiresIn: '8h' });
  res.json({ token });
});

function authMiddleware(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ message: 'Unauthorized' });
  const token = auth.slice(7);
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (e) {
    res.status(401).json({ message: 'Invalid token' });
  }
}

// Public APIs
app.get('/api/categories', (req, res) => {
  const db = readDB();
  res.json(db.categories);
});
app.get('/api/items', (req, res) => {
  const db = readDB();
  res.json(db.items);
});

// Admin APIs (protected)
app.post('/api/categories', authMiddleware, upload.single('image'), (req, res) => {
  const { name, description } = req.body;
  if (!name) return res.status(400).json({ message: 'Name required' });
  const db = readDB();
  const id = `c_${nanoid(6)}`;
  const image = req.file ? `uploads/${req.file.filename}` : '';
  const category = { id, name, description: description||'', image };
  db.categories.push(category);
  writeDB(db);
  res.json(category);
});

app.put('/api/categories/:id', authMiddleware, upload.single('image'), (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  const db = readDB();
  const cat = db.categories.find(c => c.id === id);
  if (!cat) return res.status(404).json({ message: 'Not found' });
  if (name) cat.name = name;
  if (description !== undefined) cat.description = description;
  if (req.file) {
    cat.image = `uploads/${req.file.filename}`;
  }
  writeDB(db);
  res.json(cat);
});

app.delete('/api/categories/:id', authMiddleware, (req, res) => {
  const { id } = req.params;
  const db = readDB();
  const idx = db.categories.findIndex(c => c.id === id);
  if (idx === -1) return res.status(404).json({ message: 'Not found' });
  db.categories.splice(idx,1);
  // also remove items with that category
  db.items = db.items.filter(it => it.categoryId !== id);
  writeDB(db);
  res.json({ ok: true });
});

// Items
app.post('/api/items', authMiddleware, upload.single('image'), (req, res) => {
  const { name, description, price, categoryId, featured, popular, spicy, vegetarian } = req.body;
  if (!name || !price || !categoryId) return res.status(400).json({ message: 'Missing fields' });
  const db = readDB();
  const id = `i_${nanoid(6)}`;
  const image = req.file ? `uploads/${req.file.filename}` : '';
  const item = {
    id,
    name,
    description: description||'',
    price: parseFloat(price),
    categoryId,
    image,
    featured: !!featured,
    popular: !!popular,
    spicy: !!spicy,
    vegetarian: !!vegetarian
  };
  db.items.push(item);
  writeDB(db);
  res.json(item);
});

app.put('/api/items/:id', authMiddleware, upload.single('image'), (req, res) => {
  const { id } = req.params;
  const { name, description, price, categoryId, featured, popular, spicy, vegetarian } = req.body;
  const db = readDB();
  const it = db.items.find(i => i.id === id);
  if (!it) return res.status(404).json({ message: 'Not found' });
  if (name) it.name = name;
  if (description !== undefined) it.description = description;
  if (price !== undefined) it.price = parseFloat(price);
  if (categoryId) it.categoryId = categoryId;
  it.featured = featured === 'true' || featured === true || (!!featured && featured !== '0');
  it.popular = popular === 'true' || popular === true || (!!popular && popular !== '0');
  it.spicy = spicy === 'true' || spicy === true || (!!spicy && spicy !== '0');
  it.vegetarian = vegetarian === 'true' || vegetarian === true || (!!vegetarian && vegetarian !== '0');
  if (req.file) it.image = `uploads/${req.file.filename}`;
  writeDB(db);
  res.json(it);
});

app.delete('/api/items/:id', authMiddleware, (req, res) => {
  const { id } = req.params;
  const db = readDB();
  const idx = db.items.findIndex(i => i.id === id);
  if (idx === -1) return res.status(404).json({ message: 'Not found' });
  db.items.splice(idx,1);
  writeDB(db);
  res.json({ ok: true });
});

// simple logout handled on client by discarding token

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
