// Returns random six character alphanumeric string with varied case
const generateRandomString = () => {
  // assigns an array of random alphanumeric characters (lowercase)
  let str = Math.random()
    .toString(36)
    .substring(2, 8)
    .split('');

  let alph = 'abcdefghijklmnopqrstuvwxyz';

  for (let i = 0; i < str.length; i++) {
    // If it's a alphabet char, randomly uppercase
    if (alph.indexOf(str[i]) > -1 && Math.round(Math.random()) === 1) {
      str[i] = str[i].toUpperCase();
    }
  }

  return str.join('');
};

// Returns true if email is taken, otherwise false
const emailIsTaken = (email, usersObj) => {
  for (let usr in usersObj) {
    if (usersObj[usr].email === email.toLowerCase()) {
      return usr;
    }
  }
  return false;
};

// Returns array of short URLs owned by a given user, using their ID
const urlsForUser = (id, urlObj) => {
  const urls = {};
  for (const url in urlObj) {
    if (urlObj[url].userID === id) {
      urls[url] = urlObj[url].longURL;
    }
  }
  return urls;
};

module.exports = {
  emailIsTaken,
  generateRandomString,
  urlsForUser
};
