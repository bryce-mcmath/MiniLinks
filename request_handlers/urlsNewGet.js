const cookieSession = require('cookie-session');
const fs = require('fs');

const urlsNewGet = (req, res) => {
  if (req.session.user_id) {
    const db = JSON.parse(fs.readFile('./db.json'));
    const users = db.users;
    const templateVars = {
      user: users[req.session.user_id]
    };
    res.render('urls_new', templateVars);
  } else {
    res.redirect('/register');
  }
};

module.exports = urlsNewGet;
