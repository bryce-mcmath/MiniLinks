const cookieSession = require('cookie-session');

const urlGet = (req, res) => {
  const shortURL = req.params.shortURL;
  const longURL = urlDatabase[shortURL].longURL;
  const templateVars = {
    user: users[req.session.user_id],
    shortURL,
    longURL
  };

  res.render('urls_show', templateVars);
};

module.exports = urlGet;
