const fs = require('fs');

const catchGet = (req, res) => {
  try {
    const db = JSON.parse(fs.readFileSync('./db.json'));
    const templateVars = {
      user: db.users[req.session.user_id]
    };
    res.render('not_found', templateVars);
  } catch (error) {
    console.log('Error: ', error);
    res.status(500);
    res.redirect('back');
  }
};

module.exports = catchGet;
