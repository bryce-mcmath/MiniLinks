const { getDatabase, userIsLoggedIn } = require('../helpers/helpers');

const rootGet = (req, res) => {
  const db = getDatabase();

  if (userIsLoggedIn(req.session.user_id, db.users)) {
    res.redirect('/urls');
  } else {
    res.redirect('/login');
  }
};

module.exports = rootGet;
