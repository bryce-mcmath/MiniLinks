const fs = require('fs');

// Helper functions
const { generateRandomString } = require('../helpers');

const urlsPost = (req, res) => {
  try {
    // Fetch db file and parse into an object
    const db = JSON.parse(fs.readFileSync('./db.json'));

    // Generate unique shortURL
    let shortURL = generateRandomString();
    while (Object.keys(db.urls).indexOf(shortURL) !== -1) {
      shortURL = generateRandomString();
    }

    db.urls[shortURL] = {
      longURL: req.body.longURL,
      userID: req.session.user_id
    };

    fs.writeFileSync('./db.json', JSON.stringify(db));
    res.redirect(`/urls/${shortURL}`);
  } catch (error) {
    console.log('Error: ', error);
    res.status(500);
    res.redirect('back');
  }
};

module.exports = urlsPost;
