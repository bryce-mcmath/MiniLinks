const cookieSession = require('cookie-session');

const rootGet = (req, res) => {
  if (req.session.user_id) {
    res.redirect('/urls');
  } else {
    res.redirect('/register');
  }
};

module.exports = rootGet;
