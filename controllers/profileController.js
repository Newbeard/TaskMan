const {
  Board,
  User,
} = require('../db/models');

const profileGet = async (req, res) => {
  const {
    id,
  } = req.session.user;
  try {
    const boards = await Board.findAll({
      where: {
        userId: id,
      },
    });
    res.render('profile', {
      boards,
    });
  } catch (error) {
    console.error(error);
  }
};

const profileUpdate = async (req, res) => {
  const {
    id,
  } = req.session.user;
  try {} catch (error) {
    console.error(error);
  }
};

const profileDelete = async (req, res) => {
  const {
    id,
  } = req.session.user;
  try {} catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

module.exports = {
  profileGet,
  profileDelete,
  profileUpdate,
};
