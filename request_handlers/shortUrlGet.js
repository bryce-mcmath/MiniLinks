// Helper functions
const {
  getDatabase,
  updateDatabase,
  generateId,
  getVisitorIndex,
  genVisitorId
} = require('../helpers/helpers');

const shortUrlGet = (req, res) => {
  try {
    const db = getDatabase();
    const shortURL = req.params.shortURL;
    const longURL = db.urls[shortURL].longURL;

    // create timestamp
    const date = new Date(Date.now());
    const timestamp = date.toString();

    const visitorIndex = getVisitorIndex(req.session.visitor_id, db.visitors);

    // If they already have a visitor id
    if (visitorIndex !== -1) {
      // if they have visited this url before
      if (db.visitors[visitorIndex].visited_urls[shortURL]) {
        // add timestamp to that url
        db.visitors[visitorIndex].visited_urls[shortURL].push(timestamp);
      } else {
        // add a new shorturl to their
        db.visitors[visitorIndex].visited_urls[shortURL] = [timestamp];
      }
    } else {
      const visitorId = genVisitorId(db.visitors);

      // Have a cookie!
      req.session.visitor_id = visitorId;

      // Add new visitor
      db.visitors.push({
        id: visitorId,
        visited_urls: { [shortURL]: [timestamp] },
        alerts: []
      });
    }
    updateDatabase(db);
    res.redirect(longURL);
  } catch (error) {
    console.log('Error: ', error);
    res.status(500);
    res.redirect('back');
  }
};

module.exports = shortUrlGet;
