const bcrypt = require('bcrypt');
const { User } = require('../db/models');
const { isValidEmail, isValidPassword, isValidName } = require('../helpers/validator');

const registerUserGet = async (req, res) => {
  res.render('registration');
};

const registerUserPost = async (req, res) => {
  try {
    const {
      name, email, password, confirmPassword,
    } = req.body;
    const isUserExist = await User.findOne({
      where: { email },
    });
    if (isUserExist) {
      return res.json({ success: false, errors: `Пользователь с ${email} уже зарегистрирован!` });
    }
    if (!isValidName(name)) {
      return res.json({ success: false, errors: 'Имя введено некоректно, используйте латиницу, имя должно содержать минимум три символа.' });
    }
    if (!isValidEmail(email)) {
      return res.json({ success: false, errors: 'Email введен не коректно' });
    }
    if (!isValidPassword(password)) {
      return res.json({ success: false, errors: 'Пароль должен состоять из заглавных и строчных символолв и цифр длиной не менее 6 символов' });
    }
    if (password !== confirmPassword) {
      return res.json({ success: false, errors: 'Пaроли не совпадают' });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashPassword });
    req.session.user = user;
    req.session.isSession = true;
    res.json({ success: true, message: 'Регистрация прошла успешно', url: '/' });
  } catch (error) {
    console.log(error.message);
    res.status(401)
      .json({
        message: error.message,
      }).end();
  }
};

module.exports = { registerUserGet, registerUserPost };
