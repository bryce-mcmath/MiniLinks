const generateId = require('./generateId');

// Generate a unique visitor id, checking against existing visitors in db
const genVisitorId = visitors => {
  let id = generateId();
  let clear = false;
  while (visitors && !clear) {
    for (let visitor of visitors) {
      if (visitor.id === id) {
        id = generateId();
        continue;
      }
    }
    clear = true;
  }
  return id;
};

module.exports = genVisitorId;
