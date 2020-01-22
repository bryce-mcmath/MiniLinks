const fs = require('fs');

// Helper functions
const { urlsForUser } = require('../helpers');

const urlsGet = (req, res) => {
  try {
    // Fetch db file and parse into an object
    if (req.session.user_id) {
      const db = JSON.parse(fs.readFileSync('./db.json'));
      const user = db.users[req.session.user_id];
      const userUrls = urlsForUser(req.session.user_id, db.urls);
      const templateVars = {
        user,
        urls: userUrls
      };
      res.render('urls_index', templateVars);
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

module.exports = urlsGet;
