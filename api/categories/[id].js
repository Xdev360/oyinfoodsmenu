const { readDB, writeDB } = require('../_db');

module.exports = (req, res) => {
  const { id } = req.query || {};
  if (!id) return res.status(400).json({ message: 'Missing id' });
  const db = readDB();
  const idx = db.categories.findIndex(c => c.id === id);
  const cat = db.categories[idx];
  if (req.method === 'GET'){
    if (!cat) return res.status(404).json({ message: 'Not found' });
    return res.json(cat);
  }
  if (req.method === 'PUT'){
    const { name, description, image } = req.body;
    if (!cat) return res.status(404).json({ message: 'Not found' });
    if (name) cat.name = name;
    if (description !== undefined) cat.description = description;
    if (image !== undefined) cat.image = image;
    writeDB(db);
    return res.json(cat);
  }
  if (req.method === 'DELETE'){
    if (idx === -1) return res.status(404).json({ message: 'Not found' });
    db.categories.splice(idx,1);
    db.items = db.items.filter(it => it.categoryId !== id);
    writeDB(db);
    return res.json({ ok: true });
  }
  res.status(405).json({ message: 'Method not allowed' });
};
