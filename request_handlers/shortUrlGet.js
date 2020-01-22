const fs = require('fs');

const shortUrlGet = (req, res) => {
  try {
    const db = JSON.parse(fs.readFileSync('./db.json'));
    const shortURL = req.params.shortURL;
    const longURL = db.urls[shortURL].longURL;
    res.redirect(longURL);
  } catch (error) {
    console.log('Error: ', error);
    res.status(500);
    res.redirect('back');
  }
};

module.exports = shortUrlGet;
