const router = require('express').Router();
const { login, loginEntry } = require('../controllers/loginController');
const { checkIsNotSession } = require('../middleware/sessionIsCheck');

router.route('/')
  .get(checkIsNotSession, login)
  .post(loginEntry);

module.exports = router;
