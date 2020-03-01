const initDatabase = require('./initDatabase');
const updateDatabase = require('./updateDatabase');
const getDatabase = require('./getDatabase');
const getVisits = require('./getVisits');
const getUserByEmail = require('./getUserByEmail');
const getVisitorIndex = require('./getVisitorIndex');
const urlsForUser = require('./urlsForUser');
const genShortUrl = require('./genShortUrl');
const genUserId = require('./genUserId');
const genVisitorId = require('./genVisitorId');
const getUniqVisits = require('./getUniqVisits');
const userIsLoggedIn = require('./userIsLoggedIn');
const getAlerts = require('./getAlerts');

module.exports = {
	initDatabase,
	updateDatabase,
	getDatabase,
	getUserByEmail,
	urlsForUser,
	getVisits,
	getVisitorIndex,
	genShortUrl,
	genUserId,
	genVisitorId,
	getVisitorIndex,
	getUniqVisits,
	userIsLoggedIn,
	getAlerts
};
