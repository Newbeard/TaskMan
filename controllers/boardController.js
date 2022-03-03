const {
  Board,
  User,
} = require('../db/models');

const getBoard = async (req, res) => {
  const {
    id,
  } = req.params;
  console.log(id);
  try {
    const boards = await Board.findOne({
      where: {
        id,
      },
    });
    res.render('partials/oneboards', {
      boards,
    });
  } catch (error) {
    console.error(error);
  }
};

const addBoard = async (req, res) => {
  const {
    title,
    image,
    description,
  } = req.body;
  const userId = req.session.id;
  try {
    const newBoard = await Board.create({
      title,
      image,
      description,
      userId,
    });
    res.json({
      newBoard,
    });
  } catch (error) {
    console.error(error);
  }
};

const deleteBoard = async (req, res) => {
  const {
    id,
  } = req.params;
  try {
    const boards = await Board.destroy({
      where: {
        id,
      },
    });
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

module.exports = {
  getBoard,
  deleteBoard,
  addBoard,
};
