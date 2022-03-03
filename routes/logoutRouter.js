const router = require('express').Router();
const { logoutController } = require('../controllers/logoutController');
const { checkIsSession } = require('../middleware/sessionIsCheck');

router.route('/')
  .get(checkIsSession, logoutController);

module.exports = router;
