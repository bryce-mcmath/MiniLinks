const catchGet = (req, res) => {
  const templateVars = {
    user: users[req.session.user_id]
  };
  res.render('not_found', templateVars);
};

module.exports = catchGet;
