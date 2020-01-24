// Helper functions
const { getDatabase, updateDatabase } = require('../helpers/helpers');

const urlPut = (req, res) => {
  try {
    const db = getDatabase();
    const shortURL = req.params.shortURL;
    // They are logged in
    if (userIsLoggedIn(req.session.user_id, db.users)) {
      // They are the owner
      if (req.session.user_id === db.urls[shortURL].userID) {
        // delete
        delete db.urls[shortURL];
        // alert shorturl deleted
        const index = getVisitorIndex(req.session.visitor_id, db.visitors);
        // If they have a current visitor session already
        if (index !== -1) {
          // Add alert to db
          db.visitors[index].alerts.push({
            type: 'info',
            msg: `MiniLink ${shortURL} updated`
          });
        } else {
          // Create a visitor id, object in db, and session
          const id = genVisitorId(db.visitors);
          db.visitors.push({
            id,
            visited_urls: {},
            alerts: [
              {
                type: 'info',
                msg: `MiniLink ${shortURL} updated`
              }
            ]
          });
          // Have a cookie!
          res.session.visitor_id = id;
        }

        // logged in but not owner
      } else {
        // alert cant delete stuff you dont own
        const index = getVisitorIndex(req.session.visitor_id, db.visitors);
        // If they have a current visitor session already
        if (index !== -1) {
          // Add alert to db
          db.visitors[index].alerts.push({
            type: 'danger',
            msg: "You cannot edit MiniLinks you don't own"
          });
        } else {
          // Create a visitor id, object in db, and session
          const id = genVisitorId(db.visitors);
          db.visitors.push({
            id,
            visited_urls: {},
            alerts: [
              {
                type: 'danger',
                msg: "You cannot edit MiniLinks you don't own"
              }
            ]
          });
          // Have a cookie!
          res.session.visitor_id = id;
        }
      }

      updateDatabase(db);
      res.redirect(`/urls/${shortURL}`);

      // not logged in
    } else {
      const index = getVisitorIndex(req.session.visitor_id, db.visitors);
      // If they have a current visitor session already
      if (index !== -1) {
        // Add alert to db
        db.visitors[index].alerts.push({
          type: 'danger',
          msg: 'You cannot edit MiniLinks while logged out'
        });
      } else {
        // Create a visitor id, object in db, and session
        const id = genVisitorId(db.visitors);
        db.visitors.push({
          id,
          visited_urls: {},
          alerts: [
            {
              type: 'danger',
              msg: 'You cannot edit MiniLinks while logged out'
            }
          ]
        });
        // Have a cookie!
        res.session.visitor_id = id;
      }
      updateDatabase(db);
      res.status(403);
      res.redirect('/login');
    }
  } catch (error) {
    console.log('Error: ', error);
    res.status(500);
    res.redirect('back');
  }
};

module.exports = urlPut;
