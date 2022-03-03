const {
  Board,
} = require('../db/models');

const homeController = async (req, res) => {
  try {
    // const boards = await Board.findAll();
    res.render('home');
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  homeController,
};
