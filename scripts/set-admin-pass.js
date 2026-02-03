const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const dbPath = path.join(__dirname, '..', 'db.json');
if (process.argv.length < 3) {
  console.error('Usage: node scripts/set-admin-pass.js NEW_PASSWORD');
  process.exit(1);
}
const newPass = process.argv[2];
const hash = bcrypt.hashSync(newPass, 10);
const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
if (!db.users || db.users.length === 0) {
  console.error('No users found in db.json');
  process.exit(1);
}
// update first user by default
db.users[0].passwordHash = hash;
fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));
console.log('Updated users[0].passwordHash in db.json');
console.log('New bcrypt hash:', hash);
