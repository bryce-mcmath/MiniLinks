const fs = require('fs');

const getDatabase = () => JSON.parse(fs.readFileSync('./db.json'));

module.exports = getDatabase;
