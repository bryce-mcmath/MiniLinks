const userIsLoggedIn = (session_id, users) => {
  for (let user in users) {
    if (users[user].id === session_id) {
      return true;
    }
  }
  return false;
};

module.exports = userIsLoggedIn;
