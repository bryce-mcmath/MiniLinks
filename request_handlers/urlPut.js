const fs = require('fs');

const urlPut = (req, res) => {
  try {
    const db = JSON.parse(fs.readFileSync('./db.json'));
    const shortURL = req.params.shortURL;
    if (req.session.user_id === db.urls[shortURL].userID) {
      const longURL = req.body.longURL;
      db.urls[shortURL].longURL = longURL;
      fs.writeFileSync('./db.json', JSON.stringify(db));
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
