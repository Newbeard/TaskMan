const { Post, User } = require('../db/models');

const getPost = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const cards = await Post.findOne({
      where: { id },
    });
    res.render('partials/oneCards', { cards });
  } catch (error) {
    console.error(error);
  }
};

const addPost = async (req, res) => {
  const { title, image, description } = req.body;
  const userId = req.session.id;
  try {
    const newPost = await Post.create({
      title, image, description, userId,
    });
    res.json({ newPost });
  } catch (error) {
    console.error(error);
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const cards = await Post.destroy({
      where: { id },
    });
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

module.exports = { getPost, deletePost, addPost };
