const fs = require('fs');

const urlGet = (req, res) => {
  try {
    const db = JSON.parse(fs.readFileSync('./db.json'));
    const shortURL = req.params.shortURL;
    if (req.session.user_id === db.urls[shortURL].userID) {
      const longURL = db.urls[shortURL].longURL;
      const templateVars = {
        user: db.users[req.session.user_id],
        shortURL,
        longURL
      };
      res.render(`urls_show`, templateVars);
    } else {
      res.status(403);
      res.redirect('/register');
    }
  } catch (error) {
    console.log('Error: ', error);
    res.status(500);
    res.redirect('back');
  }
};

module.exports = urlGet;
