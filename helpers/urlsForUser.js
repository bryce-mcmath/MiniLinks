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

module.exports = urlsForUser;
