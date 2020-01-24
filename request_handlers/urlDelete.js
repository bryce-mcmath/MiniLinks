// Helper functions
const {
  getDatabase,
  updateDatabase,
  userIsLoggedIn
} = require('../helpers/helpers');

const urlDelete = (req, res) => {
  try {
    const db = getDatabase();
    const shortURL = req.params.shortURL;
    if (
      userIsLoggedIn(req.session.user_id, db.users) &&
      req.session.user_id === db.urls[shortURL].userID
    ) {
      //
      delete db.urls[shortURL];
      updateDatabase(db);
      res.redirect('/urls');
    } else {
      res.status(403);
      res.redirect('/login');
    }
  } catch (error) {
    console.log('Error: ', error);
    res.status(500);
    res.redirect('back');
  }
};

module.exports = urlDelete;
