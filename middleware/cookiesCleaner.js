// промежуточная функция для очистки куки при истёкшей сессии на сервере
const cookiesCleaner = (req, res, next) => {
  if (req.cookies.user_uid && !req.session.user) {
    res.clearCookie('user_id');
    res.redirect('/');
  } else {
    next();
  }
};

module.exports = cookiesCleaner;
