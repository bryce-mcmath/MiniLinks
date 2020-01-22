const shortUrlGet = (req, res, app = app) => {
  const shortURL = req.params.shortURL;
  const longURL = urlDatabase[shortURL].longURL;
  res.redirect(longURL);
};

module.exports = shortUrlGet;
