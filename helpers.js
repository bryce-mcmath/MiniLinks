// Returns random six character alphanumeric string with varied case
const generateId = () => {
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

// Returns user id if email is taken, otherwise undefined
const getUserByEmail = (email, usersObj) => {
  for (let usr in usersObj) {
    if (usersObj[usr].email === email.toLowerCase()) {
      return usr;
    }
  }
  return undefined;
};

// Returns user id if email is taken, otherwise undefined
const getVisitorIndex = (id, urlsObj) => {
  for (let url in urlsObj) {
    let visitors = urlsObj[url].visitors;
    for (let i = 0; i < visitors.length; i++) {
      if (visitors[i].id === id) {
        return i;
      }
    }
  }
  return undefined;
};

// Returns object of URLs owned by a given user, using their ID
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
  getUserByEmail,
  generateId,
  urlsForUser,
  getVisitorIndex
};
