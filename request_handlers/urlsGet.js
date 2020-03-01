// Helper functions
const {
  getDatabase,
  urlsForUser,
  userIsLoggedIn,
  getVisitorIndex,
  updateDatabase,
  getAlerts
} = require('../helpers/helpers');

const urlsGet = (req, res) => {
  try {
    // Fetch db file and parse into an object
    const db = getDatabase();
    if (userIsLoggedIn(req.session.user_id, db.users)) {
      // Fetch user
      const user = db.users[req.session.user_id];
      // Fetch urls
      const urls = urlsForUser(req.session.user_id, db.urls);
      // Fetch alerts
      const index = getVisitorIndex(req.session.visitor_id, db.visitors);
      let alerts = [];
      if (index !== -1) {
        alerts = getAlerts(index, db.visitors);
      }
      const templateVars = {
        user,
        urls,
        alerts
      };

      res.render('urls_index', templateVars);
      if (alerts.length >= 1) {
        // Reset alerts after render
        db.visitors[index].alerts = [];

        // Update db
        updateDatabase(db);
      }
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

module.exports = urlsGet;
