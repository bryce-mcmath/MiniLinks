const fs = require('fs');

const urlGet = (req, res) => {
  try {
    const db = JSON.parse(fs.readFileSync('./db.json'));
    const shortURL = req.params.shortURL;
    const url = db.urls[shortURL];
    if (url && req.session.user_id === url.userID) {
      const templateVars = {
        user: db.users[req.session.user_id],
        url,
        shortURL
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
