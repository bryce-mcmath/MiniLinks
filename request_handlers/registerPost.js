const bcrypt = require('bcrypt');
const cookieSession = require('cookie-session');

// To be used with bcrypt
let saltRounds = 10;

// Helper functions
const { getUserByEmail, generateRandomString } = require('../helpers');

// Stand ins for db
let users = {};

const registerPost = (req, res) => {
  // Destructure info passed into post request
  const { name, email, password, password2 } = req.body;

  // Check passwords match and email hasn't been taken
  if (
    password &&
    name &&
    email &&
    password === password2 &&
    !getUserByEmail(email, users)
  ) {
    let id = generateRandomString();
    while (Object.keys(users).indexOf(id) !== -1) {
      id = generateRandomString();
    }
    console.log('WE MADE IT HERE');
    bcrypt.hash(password, saltRounds, (err, hash) => {
      console.log(users);
      users[id] = {
        name,
        email: email.toLowerCase(),
        id,
        password: hash
      };
      console.log('hash is: ', hash);
      console.log('id is: ', id);
      req.session.user_id = id;
      res.redirect('/urls');
    });
    // Add new user to users object
  } else {
    res.status(400);
    res.redirect('back');
  }
};

module.exports = registerPost;
