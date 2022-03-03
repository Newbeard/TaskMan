const router = require('express').Router();
const { profileGet, profileDelete, profileUpdate } = require('../controllers/profileController');

router.route('/')
  .get(profileGet)
  .put(profileUpdate)
  .delete(profileDelete);

module.exports = router;
