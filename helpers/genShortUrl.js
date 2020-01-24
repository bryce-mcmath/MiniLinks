const generateId = require('./generateId');

// Generate unique shortURL, checking against current urls in db
const genShortUrl = urls => {
  let shortURL = generateId();
  while (Object.keys(urls).indexOf(shortURL) !== -1) {
    shortURL = generateId();
  }
  return shortURL;
};

module.exports = genShortUrl;
