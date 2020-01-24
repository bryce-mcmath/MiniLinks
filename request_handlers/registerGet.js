// Helper functions
const {
  getDatabase,
  updateDatabase,
  userIsLoggedIn
} = require('../helpers/helpers');

const registerGet = (req, res) => {
  const db = getDatabase();
  if (userIsLoggedIn(req.session.user_id, db.users)) {
    res.redirect('/urls');
  } else {
    res.render('../views/register', { user: undefined, alerts: [] });
    // If already a visitor, reset alerts
    const visitorId = getVisitorId(req.session.visitor_id, db.visitors);
    if (visitorId !== -1) {
      db.visitors[visitorId].alerts = [];
    }
    updateDatabase(db);
  }
};

module.exports = registerGet;
