const cookieSession = require('cookie-session');

const urlDelete = (req, res) => {
  const shortURL = req.params.shortURL;
  if (req.session.user_id === urlDatabase[shortURL].userID) {
    delete urlDatabase[shortURL];
    res.redirect('/urls');
  } else {
    res.status(403);
  }
};

module.exports = urlDelete;
