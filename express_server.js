const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const bcrypt = require('bcrypt');
const app = express();
const PORT = 5050;

// Objects acting as stand-ins for a database
const users = {};
const urlDatabase = {};

// Request handlers
const {
  registerGet,
  registerPost,
  loginGet,
  loginPost,
  logoutPost,
  urlsGet,
  urlsPost,
  urlsNewGet,
  urlGet,
  urlPost,
  urlDelete,
  rootGet,
  shortUrlGet,
  catchGet
} = require('./request_handlers/handlers');

// To be used with bcrypt
const saltRounds = 10;

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

/*****************************************
 *********LOGIN/REGISTER ROUTES***********
 ****************************************/
/**
 * Renders register page
 * @method get
 */
app.get('/register', registerGet);

/**
 * Handles registration requests
 * @method post
 */
app.post('/register', registerPost);

/**
 * Renders login page
 * @method get
 */
app.get('/login', loginGet);

/**
 * Handles login requests
 * @method post
 */
app.post('/login', loginPost);

/**
 * Handles logout requests
 * @method post
 */
app.post('/logout', logoutPost);

/*****************************************
 ***************URL ROUTES****************
 ****************************************/
/**
 * Renders main page which lists urls
 * @method get
 */
app.get('/urls', urlsGet);

/**
 * Handles new short URL requests
 * @method post
 */
app.post('/urls', urlsPost);

/**
 * Renders page for creating new short URLS
 * @method get
 */
app.get('/urls/new', urlsNewGet);

/**
 * Renders specific page for a given short URL
 * @method get
 */
app.get('/urls/:shortURL', urlGet);

/**
 * Handles requests to update a short URL's corresponding long URL
 * @method post
 */
app.post('/urls/:shortURL', urlPost);

/**
 * Handles requests to delete a short URL
 * @method post
 */
app.post('/urls/:shortURL/delete', urlDelete);

/****************************************
 *************UTILITY ROUTES*************
 ***************************************/
/**
 * Redirects to urls page if logged in, otherwise
 * redirects to registration page
 * @method get
 */
app.get('/', rootGet);

/**
 * Redirects from shortened URL to assigned long URL. Main functionality
 * @method get
 */
app.get('/u/:shortURL', shortUrlGet);

/**
 * Renders Not Found
 * @method get
 */
app.get('*', catchGet);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
