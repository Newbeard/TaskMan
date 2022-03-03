const router = require('express').Router();
const { chatController } = require('../controllers/chatController');
const { checkIsSession } = require('../middleware/sessionIsCheck');

router.route('/')
  .get(checkIsSession, chatController);

module.exports = router;
