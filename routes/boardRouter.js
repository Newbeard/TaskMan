const router = require('express').Router();
const {
  getBoard,
  deleteBoard,
  addBoard,
} = require('../controllers/boardController');

router.route('/')
  .post(addBoard);

router.route('/:id')
  .get(getBoard)
  .delete(deleteBoard);

module.exports = router;
