// Helper functions
const {
  getDatabase,
  genShortUrl,
  userIsLoggedIn,
  getVisitorIndex,
  genVisitorId,
  updateDatabase
} = require('../helpers/helpers');

const urlsPost = (req, res) => {
  try {
    const db = getDatabase();

    // If logged in
    if (userIsLoggedIn(req.session.user_id, db.users)) {
      // Create shortURL
      const shortURL = genShortUrl(db.urls);
      // Create Timestamp
      const date = new Date(Date.now());
      const created = date.toString();

      // Update database model
      db.urls[shortURL] = {
        longURL: req.body.longURL,
        userID: req.session.user_id,
        created,
        visitors: []
      };

      // Write to database
      updateDatabase(db);
      res.redirect(`/urls/${shortURL}`);
    } else {
      // If not logged in and attempting to post
      // Check if they have visitor cookie
      const visitorIndex = getVisitorIndex(req.session.visitor_id, db.visitors);
      // If they have a current visitor session already
      if (visitorIndex !== -1) {
        // Add alert to db
        db.visitors[visitorIndex].alerts.push({
          type: 'danger',
          msg: 'You cannot create MiniLinks without logging in'
        });
      } else {
        // Create a visitor id, object in db, and session
        const visitorId = genVisitorId(db.visitors);
        db.visitors.push({
          visitorId,
          visited_urls: {},
          alerts: [
            {
              type: 'danger',
              msg: 'You cannot create MiniLinks without logging in'
            }
          ]
        });
        // Have a cookie!
        res.session.visitor_id = visitorId;
      }
      updateDatabase(db);
      // 403: Forbidden
      res.status(403);
      // Send them to login where the alert will display
      res.redirect('/login');
    }
  } catch (error) {
    console.log('Error: ', error);
    res.status(500);
    res.redirect('back');
  }
};

module.exports = urlsPost;
