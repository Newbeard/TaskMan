const checkIsSession = (req, res, next) => {
  if (!req.session.user) {
    res.redirect('/');
  } else {
    next();
  }
};

const checkIsNotSession = (req, res, next) => {
  if (req.session.user) {
    res.redirect('/');
  } else {
    next();
  }
};

module.exports = {
  checkIsSession,
  checkIsNotSession,
};
