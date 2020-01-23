const fs = require('fs');

const initDatabase = () => {
  // If a json db exists
  if (fs.existsSync('./db.json')) {
    // do nothing
    return;
  } else {
    // Create a new json db
    fs.writeFileSync('./db.json', JSON.stringify({ users: {}, urls: {} }));
  }
};

module.exports = initDatabase;
