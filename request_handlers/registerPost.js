const bcrypt = require('bcrypt');
const { saltRounds } = require('./config');

// Helper functions
const {
  getDatabase,
  updateDatabase,
  getUserByEmail,
  generateId
} = require('../helpers/helpers');

// ALERTS NEEDED IN HERE
const registerPost = (req, res) => {
  try {
    const db = getDatabase();

    // Destructure info passed into post request
    const { name, email, password, password2 } = req.body;

    // Check passwords match and email hasn't been taken
    if (
      password &&
      name &&
      email &&
      password === password2 &&
      !getUserByEmail(email, db.users)
    ) {
      // PUT HELPER HERE
      bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
          console.log('Error creating hash: ', err);
        } else {
          db.users[id] = {
            name,
            email: email.toLowerCase(),
            id,
            password: hash
          };
          updateDatabase(db);
          req.session.user_id = id;
          res.redirect('/urls');
        }
      });
    } else {
      // 400: Bad Request
      res.status(400);
      res.redirect('back');
    }
  } catch (error) {
    console.log('Error: ', error);
    res.status(500);
    res.redirect('back');
  }
};

module.exports = registerPost;
