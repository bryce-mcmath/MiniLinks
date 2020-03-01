const logoutPost = (req, res) => {
  res.clearCookie('session');
  res.clearCookie('session.user_id');
  res.clearCookie('session.visitor_id');
  res.clearCookie('session.sig');
  req.session = null;
  res.redirect('/login');
};

module.exports = logoutPost;
