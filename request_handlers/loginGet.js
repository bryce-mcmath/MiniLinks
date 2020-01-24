// Helper functions
const {
  getDatabase,
  updateDatabase,
  userIsLoggedIn,
  getVisitorIndex,
  genVisitorId
} = require('../helpers/helpers');

const loginGet = (req, res) => {
  const db = getDatabase();
  if (userIsLoggedIn(req.session.user_id, db.users)) {
    res.redirect('/urls');
  } else {
    const index = getVisitorIndex(req.session.visitor_id, db.visitors);
    let alerts = [];
    if (index !== -1) {
      alerts = db.visitors[index].alerts;
    }
    console.log('alerts before rendering login: ', alerts);
    res.render('login', { user: undefined, alerts });
    // If already a visitor, reset alerts
    if (index !== -1) {
      db.visitors[index].alerts = [];
      updateDatabase(db);
      console.log('alerts after rendering login: ', db.visitors[index].alerts);
    }
  }
};

module.exports = loginGet;
