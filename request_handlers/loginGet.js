const cookieSession = require('cookie-session');

const loginGet = (req, res) => {
  const id = req.session.user_id;
  if (id) {
    res.redirect('/urls');
  } else {
    res.render('login', { user: undefined });
  }
};

module.exports = loginGet;
