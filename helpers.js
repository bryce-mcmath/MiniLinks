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
      return true;
    }
  }
  return false;
};

// Returns id for valid email & password, otherwise returns false
const passwordIsValid = (email, usersObj, pw) => {
  for (let usr in usersObj) {
    if (
      usersObj[usr].email === email.toLowerCase() &&
      usersObj[usr].password === pw
    ) {
      console.log('Password is valid, usr is: ', usr);
      return usr;
    }
  }
  return undefined;
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
  passwordIsValid,
  emailIsTaken,
  generateRandomString,
  urlsForUser
};
