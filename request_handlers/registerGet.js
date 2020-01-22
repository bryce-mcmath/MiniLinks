const cookieSession = require('cookie-session');

const registerGet = (req, res) => {
  if (req.session.user_id) {
    res.redirect('/urls');
  } else {
    res.render('register', { user: undefined });
  }
};

module.exports = registerGet;
