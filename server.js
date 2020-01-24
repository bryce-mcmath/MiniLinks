const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const methodOverride = require('method-override');
const app = express();
const PORT = 5050;

// Init database
const { initDatabase } = require('./helpers/helpers');
initDatabase();

// Imported routes
const login = require('./routes/login');
const register = require('./routes/register');
const u = require('./routes/u');
const urls = require('./routes/urls');
const logout = require('./routes/logout');

// Request handlers
const { rootGet, catchGet } = require('./request_handlers/handlers');

app.set('view engine', 'ejs');

// Middleware
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
const { secret } = require('./config');
app.use(
  cookieSession({
    name: 'session',
    secret,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  })
);

/* Routes */

// Root
/**
 * Redirects to urls page if logged in, otherwise
 * redirects to registration page
 * @method get
 */
app.get('/', rootGet);

// Register
app.use('/register', register);

// Login
app.use('/login', login);

// Logout
app.use('/logout', logout);

// URLs
app.use('/urls', urls);

// Short URLs
app.use('/u', u);

// Catch
/**
 * Renders Not Found
 * @method get
 */
app.get('/*', catchGet);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}!`);
});
