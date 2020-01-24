const bcrypt = require('bcrypt');

// Helper functions
const {
  getDatabase,
  updateDatabase,
  getUserByEmail
} = require('../helpers/helpers');

// ALERT NEEDED IN HERE
const loginPost = (req, res) => {
  try {
    const db = getDatabase();

    // Destructure info passed into post request
    const { email, password } = req.body;

    // Check if email is in the db, if it is return user id
    const id = getUserByEmail(email, db.users);

    // Confirm there is a pw, email, and id for this login attempt
    if (password && email && id) {
      // Get hashed pw from db
      const hash = db.users[id].password;

      // Verify correct pw
      bcrypt.compare(password, hash, (err, result) => {
        if (err) {
          console.log('Error: ', err);
          // 500: Internal server error
          res.status(500);
        } else {
          if (result) {
            req.session.user_id = id;
            res.redirect('/urls');
          } else {
            console.log('Wrong password attempted');
            // 403: Forbidden
            res.status(403);
            res.redirect('back');
          }
        }
      });
    }
  } catch (error) {
    console.log('Error: ', error);
    res.status(500);
    res.redirect('back');
  }
};

module.exports = loginPost;
