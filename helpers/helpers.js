// Working
const initDatabase = require('./initDatabase');
// Working
const updateDatabase = require('./updateDatabase');
// Working
const getDatabase = require('./getDatabase');
// Working
const getVisits = require('./getVisits');
// Working
const getUserByEmail = require('./getUserByEmail');
// Working
const getVisitorIndex = require('./getVisitorIndex');
// Working
const urlsForUser = require('./urlsForUser');
// Working
const genShortUrl = require('./genShortUrl');
// Working
const genUserId = require('./genUserId');
// Working
const genVisitorId = require('./genVisitorId');
// Working
const getUniqVisits = require('./getUniqVisits');
// Working
const userIsLoggedIn = require('./userIsLoggedIn');
// Working
const getAlerts = require('./getAlerts');

module.exports = {
  initDatabase,
  updateDatabase,
  getDatabase,
  getUserByEmail,
  generateId,
  urlsForUser,
  getVisits,
  getVisitorIndex,
  genShortUrl,
  genUserId,
  genVisitorId,
  getUniqVisits,
  userIsLoggedIn,
  getAlerts
};
