const { readDB, writeDB } = require('../_db');

module.exports = (req, res) => {
  if (req.method === 'GET'){
    const db = readDB();
    return res.json(db.categories || []);
  }

  if (req.method === 'POST'){
    // expect JSON: { name, description, image }
    const { name, description, image } = req.body;
    if (!name) return res.status(400).json({ message: 'Name required' });
    const db = readDB();
    const id = 'c_' + Date.now().toString(36);
    const cat = { id, name, description: description||'', image: image||'' };
    db.categories.push(cat);
    writeDB(db);
    return res.json(cat);
  }

  res.status(405).json({ message: 'Method not allowed' });
};
