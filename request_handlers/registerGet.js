const registerGet = (req, res) => {
  if (req.session.user_id) {
    res.redirect('/urls');
  } else {
    res.render('../views/register', { user: undefined });
  }
};

module.exports = registerGet;
