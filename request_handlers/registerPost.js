const bcrypt = require('bcrypt');
const { saltRounds } = require('../config');

// Helper functions
const {
  getDatabase,
  updateDatabase,
  getUserByEmail,
  genUserId,
  genVisitorId
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
      const id = genUserId(db.users);
      bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
          console.log('Error creating hash: ', err);
        } else {
          // Add user to db
          db.users[id] = {
            name,
            email: email.toLowerCase(),
            id,
            password: hash
          };
          // Add user to visitors and add alert
          db.visitors.push({
            id,
            visited_urls: {},
            alerts: [{ type: 'success', msg: 'Account successfully created!' }]
          });
          updateDatabase(db);
          req.session.visitor_id = id;
          req.session.user_id = id;
          res.redirect('/urls');
        }
      });
    } else {
      const id = genVisitorId();

      if (getUserByEmail(email, db.users)) {
        db.visitors.push({
          id,
          visited_urls: {},
          alerts: [{ type: 'warning', msg: 'That email is already taken' }]
        });
      } else if (password !== password2) {
        db.visitors.push({
          id,
          visited_urls: {},
          alerts: [
            { type: 'warning', msg: 'Please ensure your passwords match' }
          ]
        });
      } else {
        db.visitors.push({
          id,
          visited_urls: {},
          alerts: [
            { type: 'warning', msg: 'There was a problem, please try again' }
          ]
        });
      }
      updateDatabase(db);
      req.session.visitor_id = id;
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
