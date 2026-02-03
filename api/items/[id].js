const { readDB, writeDB } = require('../_db');

module.exports = (req, res) => {
  const { id } = req.query || {};
  if (!id) return res.status(400).json({ message: 'Missing id' });
  const db = readDB();
  const idx = db.items.findIndex(i => i.id === id);
  const it = db.items[idx];
  if (req.method === 'GET'){
    if (!it) return res.status(404).json({ message: 'Not found' });
    return res.json(it);
  }
  if (req.method === 'PUT'){
    const { name, description, price, categoryId, image, featured, popular, spicy, vegetarian } = req.body;
    if (!it) return res.status(404).json({ message: 'Not found' });
    if (name) it.name = name;
    if (description !== undefined) it.description = description;
    if (price !== undefined) it.price = parseFloat(price);
    if (categoryId) it.categoryId = categoryId;
    if (image !== undefined) it.image = image;
    it.featured = featured === 'true' || featured === true || (!!featured && featured !== '0');
    it.popular = popular === 'true' || popular === true || (!!popular && popular !== '0');
    it.spicy = spicy === 'true' || spicy === true || (!!spicy && spicy !== '0');
    it.vegetarian = vegetarian === 'true' || vegetarian === true || (!!vegetarian && vegetarian !== '0');
    writeDB(db);
    return res.json(it);
  }
  if (req.method === 'DELETE'){
    if (idx === -1) return res.status(404).json({ message: 'Not found' });
    db.items.splice(idx,1);
    writeDB(db);
    return res.json({ ok: true });
  }
  res.status(405).json({ message: 'Method not allowed' });
};
