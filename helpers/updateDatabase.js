const fs = require('fs');

const updateDatabase = db => {
  fs.writeFileSync('./db.json', JSON.stringify(db, null, 2));
};

module.exports = updateDatabase;
