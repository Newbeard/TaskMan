const logoutController = async (req, res) => {
  res.clearCookie('user_id');
  req.session.destroy();
  res.redirect('/');
};

module.exports = { logoutController };
