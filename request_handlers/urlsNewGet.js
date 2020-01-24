// Helper functions
const { userIsLoggedIn, getDatabase } = require('../helpers/helpers');

const urlsNewGet = (req, res) => {
  try {
    // Fetch db file and parse into an object
    const db = getDatabase();
    if (userIsLoggedIn(req.session.user_id, db.users)) {
      const user = db.users[req.session.user_id];
      const templateVars = {
        user
      };
      res.render('urls_new', templateVars);
    } else {
      res.redirect('/login');
    }
  } catch (error) {
    console.log('Error: ', error);
    res.status(500);
    res.redirect('back');
  }
};

module.exports = urlsNewGet;
