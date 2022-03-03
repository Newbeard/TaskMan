const router = require('express').Router();
const { chatController } = require('../controllers/chatController');

router.route('/')
  .get(chatController);

module.exports = router;
