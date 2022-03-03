const router = require('express').Router();
const { getPost, deletePost, addPost } = require('../controllers/postController');

router.route('/')
  .post(addPost);

router.route('/:id')
  .get(getPost)
  .delete(deletePost);

module.exports = router;
