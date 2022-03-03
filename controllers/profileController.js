const {
  Board,
} = require('../db/models');

const profileGet = async (req, res) => {
  // const {
  //   id,
  // } = req.session.user;
  try {
    // const boards = await Board.findAll({
    //   where: {
    //     userId: id,
    //   },
    // });
    res.render('profile');
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  profileGet,
};
