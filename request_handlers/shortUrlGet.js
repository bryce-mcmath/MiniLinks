const { generateId, getVisitorIndex } = require('../helpers/helpers');

const fs = require('fs');

const shortUrlGet = (req, res) => {
  try {
    const db = JSON.parse(fs.readFileSync('./db.json'));
    const shortURL = req.params.shortURL;
    const longURL = db.urls[shortURL].longURL;
    const index = getVisitorIndex(req.session.visitor_id, db.urls);
    if (typeof index === 'number') {
      console.log('Hit first route');
      db.urls[shortURL].visitors[index].visits.push(Date.now());
    } else {
      let id = generateId();
      let clear = false;
      // check that generated id is not already taken
      while (!clear) {
        for (let url in db.urls) {
          for (let visitor in url.visitors) {
            if (visitor.id === id) {
              // regen and check again
              id = generateId();
              continue;
            }
          }
        }
        clear = true;
      }
      req.session.visitor_id = id;
      db.urls[shortURL].visitors.push({ id, visits: [Date.now()] });
    }

    fs.writeFileSync('./db.json', JSON.stringify(db, null, 2));
    res.redirect(longURL);
  } catch (error) {
    console.log('Error: ', error);
    res.status(500);
    res.redirect('back');
  }
};

module.exports = shortUrlGet;
