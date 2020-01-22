const bcrypt = require('bcrypt');
const cookieSession = require('cookie-session');
const fs = require('fs');


// Helper functions
const { generateRandomString } = require('../helpers');

const urlsPost = (req, res) => {
  let shortURL = generateRandomString();
  while (Object.keys(urlDatabase).indexOf(shortURL) !== -1) {
    shortURL = generateRandomString();
  }
  fs.readFile('./db.json'(err, data) => {
  if (err) throw err;
  const db = JSON.parse(data);
});
    const users = db.users;
  urlDatabase[shortURL] = {
    longURL: req.body.longURL,
    userID: req.session.user_id
  };

  res.redirect(`/urls/${shortURL}`);
};

module.exports = urlsPost;
