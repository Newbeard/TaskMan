module.exports = (req, res, next) => {
  if (req.session && req.session.user) {
    res.locals.id = req.session.user.id;
    res.locals.name = req.session.user.name;
    res.locals.email = req.session.user.email;
    res.locals.isSession = req.session.isSession;
  } else {
    res.locals.isSession = false;
  }
  next();
};
