const cookieSession = require('cookie-session');

// Helper functions
const { urlsForUser } = require('../helpers');

// Stand ins for db
let urlDatabase = {};
let users = {};

const urlsGet = (req, res) => {
  const urls = urlsForUser(req.session.user_id, urlDatabase);
  const templateVars = {
    user: users[req.session.user_id],
    urls
  };
  res.render('urls_index', templateVars);
};

module.exports = urlsGet;
