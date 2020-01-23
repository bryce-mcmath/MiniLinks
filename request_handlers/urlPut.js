const fs = require('fs');

const urlPut = (req, res) => {
  try {
    const db = JSON.parse(fs.readFileSync('./db.json'));
    const shortURL = req.params.shortURL;
    if (req.session.user_id === db.urls[shortURL].userID) {
      const longURL = req.body.longURL;
      db.urls[shortURL].longURL = longURL;
      db.urls[shortURL].visitors = [];
      fs.writeFileSync('./db.json', JSON.stringify(db, null, 2));
      res.redirect(`/urls/${shortURL}`);
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

module.exports = urlPut;
