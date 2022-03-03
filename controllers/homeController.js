const { Post } = require('../db/models');

const homeController = async (req, res) => {
  try {
    const cards = await Post.findAll();
    res.render('home', { cards });
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  homeController,
};
