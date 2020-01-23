const fs = require('fs');

// Helper functions
const { generateId } = require('../helpers');

const urlsPost = (req, res) => {
  try {
    const db = JSON.parse(fs.readFileSync('./db.json'));

    // If logged in
    if (Object.keys(db.users).indexOf(req.session.user_id) !== -1) {
      // Fetch db file and parse into an object

      // Generate unique shortURL
      let shortURL = generateId();
      while (Object.keys(db.urls).indexOf(shortURL) !== -1) {
        shortURL = generateId();
      }

      // If they have visited before
      if (req.session.visitor_id) {
        const { visitors } = db.urls[shortURL].visitors;
        const index = getVisitorIndex(req.session.visitor_id, db.urls);

        // Add another visit
        visitors[index].visits.push(Date.now());

        // Update database
        db.urls[shortURL] = {
          longURL: req.body.longURL,
          userID: req.session.user_id,
          visitors
        };
      } else {
        // visitor id generation for someone who hasn't visited
        let id = generateId();
        let clear = false;

        // check that generated id is not already taken and
        while (!clear && db.urls[shortURL]) {
          for (let url of db.urls) {
            for (let visitor in url.visitors) {
              if (visitor.id === id) {
                // regen and check again
                id = generateId();
                continue;
              }
            }
          }
          const { visitors } = db.urls[shortURL].visitors;
          visitors.push({ id, visits: [Date.now()] });
          req.session.visitor_id = id;
          db.urls[shortURL] = {
            longURL: req.body.longURL,
            userID: req.session.user_id,
            visitors
          };
          clear = true;
        }

        // If no urls yet
        if (!clear) {
          req.session.visitor_id = id;
          db.urls[shortURL] = {
            longURL: req.body.longURL,
            userID: req.session.user_id,
            visitors: [{ id, visits: [Date.now()] }]
          };
        }
      }

      fs.writeFileSync('./db.json', JSON.stringify(db, null, 2));
      res.redirect(`/urls/${shortURL}`);
    } else {
      res.status(403);
      res.redirect('/register');
    }
  } catch (error) {
    console.log('Error: ', error);
    res.status(500);
    res.redirect('back');
  }
};

module.exports = urlsPost;
