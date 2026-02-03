const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { readDB } = require('./_db');

const JWT_SECRET = process.env.JWT_SECRET || 'change-this-secret';

module.exports = (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });
  let body = req.body;
  if (!body || Object.keys(body).length === 0) {
    // sometimes Vercel doesn't parse JSON automatically for older runtimes; parse raw
    try { body = JSON.parse(req.rawBody || '{}'); } catch(e) { body = {}; }
  }
  const { email, password } = body;
  if (!email || !password) return res.status(400).json({ message: 'Missing credentials' });
  const db = readDB();
  const user = db.users.find(u => u.email === email);
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  if (!bcrypt.compareSync(password, user.passwordHash)) return res.status(401).json({ message: 'Invalid credentials' });
  const token = jwt.sign({ uid: user.id, email: user.email }, JWT_SECRET, { expiresIn: '8h' });
  res.json({ token });
};
