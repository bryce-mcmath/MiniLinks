// Helper functions
const {
  getDatabase,
  updateDatabase,
  userIsLoggedIn,
  getVisitorIndex
} = require('../helpers/helpers');

const registerGet = (req, res) => {
  const db = getDatabase();
  if (userIsLoggedIn(req.session.user_id, db.users)) {
    res.redirect('/urls');
  } else {
    const visitorIndex = getVisitorIndex(req.session.visitor_id, db.visitors);
    let alerts = [];
    if (visitorIndex !== -1) {
      alerts = db.visitors[visitorIndex].alerts;
    }
    res.render('../views/register', { user: undefined, alerts });
    // If already a visitor, reset alerts
    if (visitorIndex !== -1) {
      db.visitors[visitorIndex].alerts = [];
      updateDatabase(db);
    }
  }
};

module.exports = registerGet;
