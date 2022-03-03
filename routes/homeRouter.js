const router = require('express').Router();
const { homeController } = require('../controllers/homeController');

router.route('/')
  .get(homeController);

module.exports = router;
