// Returns user id if email is taken, otherwise undefined
const getUserByEmail = (email, usersObj) => {
  for (let usr in usersObj) {
    if (usersObj[usr].email === email.toLowerCase()) {
      return usr;
    }
  }
  return undefined;
};

module.exports = getUserByEmail;
