const { readDB, writeDB } = require('../_db');

module.exports = (req, res) => {
  if (req.method === 'GET'){
    const db = readDB();
    return res.json(db.items || []);
  }

  if (req.method === 'POST'){
    const { name, description, price, categoryId, image, featured, popular, spicy, vegetarian } = req.body;
    if (!name || !price || !categoryId) return res.status(400).json({ message: 'Missing fields' });
    const db = readDB();
    const id = 'i_' + Date.now().toString(36);
    const it = { id, name, description: description||'', price: parseFloat(price), categoryId, image: image||'', featured: !!featured, popular: !!popular, spicy: !!spicy, vegetarian: !!vegetarian };
    db.items.push(it);
    writeDB(db);
    return res.json(it);
  }

  res.status(405).json({ message: 'Method not allowed' });
};
