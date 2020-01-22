const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const bcrypt = require('bcrypt');
const app = express();
const PORT = 5050;

// To be used with bcrypt
const saltRounds = 10;

// Helper functions
const {
  getUserByEmail,
  generateRandomString,
  urlsForUser
} = require('./helpers');

app.set('view engine', 'ejs');

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  cookieSession({
    name: 'session',
    secret: 'ckent',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  })
);

// Objects acting as stand-ins for a database
const users = {};
const urlDatabase = {};

/*****************************************
 *********LOGIN/REGISTER ROUTES***********
 ****************************************/
/**
 * Renders register page
 * @method get
 */
app.get('/register', (req, res) => {
  if (req.session.user_id) {
    res.redirect('/urls');
  } else {
    res.render('register', { user: undefined });
  }
});

/**
 * Handles registration requests
 * @method post
 */
app.post('/register', (req, res) => {
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

    bcrypt.hash(password, saltRounds, (err, hash) => {
      users[id] = {
        name,
        email: email.toLowerCase(),
        id,
        password: hash
      };

      req.session.user_id = id;
      res.redirect('/urls');
    });
    // Add new user to users object
  } else {
    res.status(400);
    res.redirect('back');
  }
});

/**
 * Renders login page
 * @method get
 */
app.get('/login', (req, res) => {
  const id = req.session.user_id;
  if (id) {
    res.redirect('/urls');
  } else {
    res.render('login', { user: undefined });
  }
});

/**
 * Handles login requests
 * @method post
 */
app.post('/login', (req, res) => {
  // Destructure info passed into post request
  const { email, password } = req.body;
  // Check if email is in the db, if it is return user id
  const id = getUserByEmail(email, users);

  // Confirm there is a pw, email, and id for this login attempt
  if (password && email && id) {
    // Get hashed pw from db
    const hash = users[id].password;
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
});

/**
 * Handles logout requests
 * @method post
 */
app.post('/logout', (req, res) => {
  res.clearCookie('user_id');
  res.clearCookie('session');
  res.clearCookie('session.sig');
  res.redirect('/register');
});

/*****************************************
 ***************URL ROUTES****************
 ****************************************/
/**
 * Renders main page which lists urls
 * @method get
 */
app.get('/urls', (req, res) => {
  const urls = urlsForUser(req.session.user_id, urlDatabase);
  const templateVars = {
    user: users[req.session.user_id],
    urls
  };
  res.render('urls_index', templateVars);
});

/**
 * Handles new short URL requests
 * @method post
 */
app.post('/urls', (req, res) => {
  let shortURL = generateRandomString();
  while (Object.keys(urlDatabase).indexOf(shortURL) !== -1) {
    shortURL = generateRandomString();
  }
  urlDatabase[shortURL] = {
    longURL: req.body.longURL,
    userID: req.session.user_id
  };

  res.redirect(`/urls/${shortURL}`);
});

/**
 * Renders page for creating new short URLS
 * @method get
 */
app.get('/urls/new', (req, res) => {
  if (req.session.user_id) {
    const templateVars = {
      user: users[req.session.user_id]
    };
    res.render('urls_new', templateVars);
  } else {
    res.redirect('/register');
  }
});

/**
 * Renders specific page for a given short URL
 * @method get
 */
app.get('/urls/:shortURL', (req, res) => {
  const shortURL = req.params.shortURL;
  const longURL = urlDatabase[shortURL].longURL;
  const templateVars = {
    user: users[req.session.user_id],
    shortURL,
    longURL
  };

  res.render('urls_show', templateVars);
});

/**
 * Handles requests to update a short URL's corresponding long URL
 * @method post
 */
app.post('/urls/:shortURL', (req, res) => {
  const shortURL = req.params.shortURL;
  const longURL = req.body.longURL;
  if (req.session.user_id === urlDatabase[shortURL].userID) {
    urlDatabase[shortURL].longURL = req.body.longURL;
    res.redirect(`/urls/${shortURL}`);
  } else {
    res.status(403);
  }
});

/**
 * Handles requests to delete a short URL
 * @method post
 */
app.post('/urls/:shortURL/delete', (req, res) => {
  const shortURL = req.params.shortURL;
  if (req.session.user_id === urlDatabase[shortURL].userID) {
    delete urlDatabase[shortURL];
    res.redirect('/urls');
  } else {
    res.status(403);
  }
});

/****************************************
 *************UTILITY ROUTES*************
 ***************************************/
/**
 * Redirects to urls page if logged in, otherwise
 * redirects to registration page
 * @method get
 */
app.get('/', (req, res) => {
  if (req.session.user_id) {
    res.redirect('/urls');
  } else {
    res.redirect('/register');
  }
});

/**
 * Redirects from shortened URL to assigned long URL. Main functionality
 * @method get
 */
app.get('/u/:shortURL', (req, res, app = app) => {
  const shortURL = req.params.shortURL;
  const longURL = urlDatabase[shortURL].longURL;
  res.redirect(longURL);
});

/**
 * Renders Not Found page
 * @method get
 */
app.get('*', (req, res) => {
  const templateVars = {
    user: users[req.session.user_id]
  };
  res.render('not_found', templateVars);
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
