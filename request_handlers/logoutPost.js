const logoutPost = (req, res) => {
  res.clearCookie('session');
  res.clearCookie('session.sig');
  res.redirect('/login');
};

module.exports = logoutPost;
