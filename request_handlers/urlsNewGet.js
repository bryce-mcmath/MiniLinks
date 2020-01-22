const fs = require('fs');

const urlsNewGet = (req, res) => {
  try {
    // Fetch db file and parse into an object
    if (req.session.user_id) {
      const db = JSON.parse(fs.readFileSync('./db.json'));
      const users = db.users;
      const templateVars = {
        user: users[req.session.user_id]
      };
      res.render('urls_new', templateVars);
    } else {
      res.redirect('/register');
    }
  } catch (error) {
    console.log('Error: ', error);
    res.status(500);
    res.redirect('back');
  }
};

module.exports = urlsNewGet;
