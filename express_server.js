const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 5050;

// Helper functions
const {
  passwordIsValid,
  emailIsTaken,
  generateRandomString,
  urlsForUser
} = require('./helpers');

app.set('view engine', 'ejs');

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Objects acting as stand-ins for a database
const urlDatabase = {
  b2xVn2: { longURL: 'http://www.lighthouselabs.ca', userID: 'A7ei0p' },
  '9sm5xK': { longURL: 'http://www.google.com', userID: 'e7I9U0' }
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
  console.log('HIT /');
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
  console.log('HIT /u/:shortURL');
  const shortURL = req.params.shortURL;
  const longURL = urlDatabase[shortURL].longURL;
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
  console.log('HIT /register');
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

  // Check passwords match and email hasn't been taken
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
  console.log('HIT /login');
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
  console.log('HIT /urls');
  const urls = urlsForUser(req.cookies['user_id'], urlDatabase);
  const templateVars = {
    user: users[req.cookies['user_id']],
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
    userID: req.cookies['user_id']
  };

  res.redirect(`/urls/${shortURL}`);
});

/**
 * Renders page for creating new short URLS
 * @method get
 */
app.get('/urls/new', (req, res) => {
  console.log('HIT /urls/new');
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
  console.log('HIT /urls/:shortURL');
  const shortURL = req.params.shortURL;
  const longURL = urlDatabase[shortURL].longURL;
  const templateVars = {
    user: users[req.cookies['user_id']],
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
  if (req.cookies['user_id'] === urlDatabase[shortURL].userID) {
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
  if (req.cookies['user_id'] === urlDatabase[shortURL].userID) {
    delete urlDatabase[shortURL];
    res.redirect('/urls');
  } else {
    res.status(403);
  }
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
