// Helper functions
const { getDatabase, userIsLoggedIn } = require('../helpers/helpers');

const loginGet = (req, res) => {
  const db = getDatabase();
  if (userIsLoggedIn(req.session.user_id, db.users)) {
    res.redirect('/urls');
  } else {
    res.render('login', { user: undefined, alerts: [] });
  }
};

module.exports = loginGet;
