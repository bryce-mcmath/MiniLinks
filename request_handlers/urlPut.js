// Helper functions
const { getDatabase, updateDatabase } = require('../helpers/helpers');

const urlPut = (req, res) => {
  try {
    const db = getDatabase();
    const shortURL = req.params.shortURL;
    if (req.session.user_id === db.urls[shortURL].userID) {
      const longURL = req.body.longURL;
      db.urls[shortURL].longURL = longURL;
      db.urls[shortURL].visitors = [];
      updateDatabase(db);
      res.redirect(`/urls/${shortURL}`);
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

module.exports = urlPut;
