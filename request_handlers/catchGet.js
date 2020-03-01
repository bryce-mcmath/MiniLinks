// Helper functions
const { getDatabase } = require('../helpers/helpers');

const catchGet = (req, res) => {
  try {
    const db = getDatabase();
    const user = db.users[req.session.user_id];
    const templateVars = {
      user
    };
    res.render('not_found', templateVars);
  } catch (error) {
    console.log('Error: ', error);
    res.status(500);
    res.redirect('back');
  }
};

module.exports = catchGet;
