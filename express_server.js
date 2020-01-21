const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 5050;

// Helper functions
const {
  passwordIsValid,
  emailIsTaken,
  generateRandomString
} = require('./helpers');

app.set('view engine', 'ejs');

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Objects acting as stand-ins for a database
const urlDatabase = {
  b2xVn2: 'http://www.lighthouselabs.ca',
  '9sm5xK': 'http://www.google.com'
};
const users = {
  A7ei0p: {
    name: 'Andy',
    id: 'A7ei0p',
    email: 'andy@gmail.com',
    password: 'purple-monkey-dinosaur'
  },
  lL32o0: {
    name: 'Mark',
    id: 'lL32o0',
    email: 'mark@gmail.com',
    password: 'dishwasher-funk'
  },
  e7I9U0: {
    name: 'Bryce McMath',
    id: 'e7I9U0',
    email: 'bryce.j.mcmath@gmail.com',
    password: '123456'
  }
};

/****************************************
 *************UTILITY ROUTES*************
 ***************************************/
/**
 * Redirects to urls page if logged in, otherwise
 * redirects to registration page
 * @method get
 */
app.get('/', (req, res) => {
  if (req.cookies['user_id']) {
    res.redirect('/urls');
  } else {
    res.redirect('/register');
  }
});

/**
 * Redirects from shortened URL to assigned long URL. Main functionality
 * @method get
 */
app.get('/u/:shortURL', (req, res) => {
  const longURL = urlDatabase[req.params.shortURL];
  res.redirect(longURL);
});

/*****************************************
 *********LOGIN/REGISTER ROUTES***********
 ****************************************/
/**
 * Renders register page
 * @method get
 */
app.get('/register', (req, res) => {
  if (req.cookies['user_id']) {
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

  // Check the passwords match (should also check on front end)
  if (
    password &&
    name &&
    email &&
    password === password2 &&
    !emailIsTaken(email, users)
  ) {
    let id = generateRandomString();
    while (Object.keys(users).indexOf(id) !== -1) {
      id = generateRandomString();
    }

    // Add new user to users object
    users[id] = {
      name,
      email: email.toLowerCase(),
      id,
      password
    };

    res.cookie('user_id', id);
    res.redirect('/urls');
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
  const id = req.cookies['user_id'];
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

  // Check the passwords match (should also check on front end)
  if (password && email && passwordIsValid(email, users, password)) {
    const id = passwordIsValid(email, users, password);
    res.cookie('user_id', id);
    res.redirect('/urls');
  } else {
    res.status(403);
    res.redirect('back');
  }
});

/**
 * Handles logout requests
 * @method post
 */
app.post('/logout', (req, res) => {
  res.clearCookie('user_id');
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
  if (req.cookies['user_id']) {
    const templateVars = {
      user: users[req.cookies['user_id']],
      urls: urlDatabase
    };
    res.render('urls_index', templateVars);
  } else {
    res.redirect('/register');
  }
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
  urlDatabase[shortURL] = req.body.longURL;

  res.redirect(`/urls/${shortURL}`);
});

/**
 * Renders page for creating new short URLS
 * @method get
 */
app.get('/urls/new', (req, res) => {
  if (req.cookies['user_id']) {
    const templateVars = {
      user: users[req.cookies['user_id']]
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
  const templateVars = {
    user: users[req.cookies['user_id']],
    shortURL: req.params.shortURL,
    longURL: urlDatabase[req.params.shortURL]
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
  urlDatabase[shortURL] = req.body.longURL;
  res.redirect(`/urls/${shortURL}`);
});

/**
 * Handles requests to delete a short URL
 * @method post
 */
app.post('/urls/:shortURL/delete', (req, res) => {
  const shortURL = req.params.shortURL;
  delete urlDatabase[shortURL];
  res.redirect('/urls');
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
