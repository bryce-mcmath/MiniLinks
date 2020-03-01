// Helper functions
const {
  getDatabase,
  updateDatabase,
  userIsLoggedIn,
  getVisitorIndex,
  getAlerts,
  getVisits,
  getUniqVisits
} = require('../helpers/helpers');

const urlGet = (req, res) => {
  try {
    const db = getDatabase();
    const shortURL = req.params.shortURL;
    const url = db.urls[shortURL];
    // If the url exists and belongs to the user who is logged in
    if (
      userIsLoggedIn(req.session.user_id, db.users) &&
      url &&
      req.session.user_id === url.userID
    ) {
      // Fetch user
      const user = db.users[req.session.user_id];
      // Fetch alerts
      const visitorIndex = getVisitorIndex(req.session.visitor_id, db.visitors);
      const alerts = getAlerts(visitorIndex, db.visitors);
      const visits = getVisits(shortURL, db.visitors);
      const uniques = getUniqVisits(shortURL, db.visitors);

      const templateVars = {
        user,
        url,
        shortURL,
        visits,
        uniques,
        alerts
      };
      res.render(`urls_show`, templateVars);
      // Reset alerts after rendering
      db.visitors[visitorIndex].alerts = [];
      updateDatabase(db);
    } else {
      res.status(403);
      res.redirect('/urls');
    }
  } catch (error) {
    console.log('Error: ', error);
    res.status(500);
    res.redirect('back');
  }
};

module.exports = urlGet;
