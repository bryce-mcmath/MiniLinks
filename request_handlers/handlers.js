const registerGet = require('./registerGet');
const registerPost = require('./registerPost');
const loginGet = require('./loginGet');
const loginPost = require('./loginPost');
const logoutPost = require('./logoutPost');
const urlsGet = require('./urlsGet');
const urlsPost = require('./urlsPost');
const urlsNewGet = require('./urlsNewGet');
const urlGet = require('./urlGet');
const urlPost = require('./urlPost');
const urlDelete = require('./urlDelete');
const rootGet = require('./rootGet');
const shortUrlGet = require('./shortUrlGet');
const catchGet = require('./catchGet');

module.exports = {
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
};
