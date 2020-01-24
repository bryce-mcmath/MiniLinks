const generateId = require('./generateId');

// Generate a unique user id, checking against existing users in db
const genUserId = users => {
  let id = generateId();
  while (Object.keys(users).indexOf(id) !== -1) {
    id = generateId();
  }
  return id;
};

module.exports = genUserId;
