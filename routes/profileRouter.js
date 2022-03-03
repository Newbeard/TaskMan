const router = require('express').Router();
const { profileGet } = require('../controllers/profileController');

router.route('/')
  .get(profileGet);

module.exports = router;
