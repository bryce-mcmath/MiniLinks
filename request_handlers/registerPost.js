const bcrypt = require('bcrypt');
const fs = require('fs');

// To be used with bcrypt
let saltRounds = 10;

// Helper functions
const { getUserByEmail, generateRandomString } = require('../helpers');

const registerPost = (req, res) => {
  try {
    const db = JSON.parse(fs.readFileSync('./db.json'));
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
      let id = generateRandomString();
      while (Object.keys(db.users).indexOf(id) !== -1) {
        id = generateRandomString();
      }
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
          fs.writeFileSync('./db.json', JSON.stringify(db));
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
