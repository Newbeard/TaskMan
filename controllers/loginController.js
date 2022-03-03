const bcrypt = require('bcrypt');
const { User } = require('../db/models');

const login = async (req, res) => {
  res.render('login');
};

const loginEntry = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const user = await User.findOne({
      where: { email },
    });
    console.log(user);
    if (user === null) {
      return res.json({ success: false, errors: `Пользователь с ${email} не зарегистрирован!` });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401)
        .json({ success: false, errors: 'Пароль не верный' });
    }
    req.session.user = user;
    req.session.isSession = true;
    res.json({ success: true, message: 'Авторизация прошла успешно', url: '/' });
  } catch (error) {
    console.log(error.message);
    res.status(401)
      .json({
        message: error.message,
      }).end();
  }
};

module.exports = { login, loginEntry };
