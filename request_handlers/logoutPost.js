const logoutPost = (req, res) => {
  res.clearCookie('session');
  res.clearCookie('session.sig');
  req.session = null;
  res.redirect('/login');
};

module.exports = logoutPost;
