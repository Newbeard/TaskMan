const router = require('express').Router();
const {
  registerUserGet,
  registerUserPost,
} = require('../controllers/registrationController');
const {
  checkIsNotSession,
} = require('../middleware/sessionIsCheck');

router.route('/')
  .get(checkIsNotSession, registerUserGet)
  .post(registerUserPost);

module.exports = router;
