const logoutPost = (req, res) => {
  res.clearCookie('user_id');
  res.clearCookie('session');
  res.clearCookie('session.sig');
  res.redirect('/register');
};

module.exports = logoutPost;
