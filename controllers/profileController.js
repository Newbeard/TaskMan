const {
  Board, Task,
} = require('../db/models');

const profileGet = async (req, res) => {
  // const {
  //   id,
  // } = req.session.user;
  try {
    const taskEnd = await Task.findAll({
      where: {
        boardId: 1,
        statusdId: 3,
      },
    });
    const taskStart = await Task.findAll({
      where: {
        boardId: 1,
        statusdId: 1,
      },
    });
    const taskProcess = await Task.findAll({
      where: {
        boardId: 1,
        statusdId: 2,
      },
    });
    res.render('profile', { boardId: 1, taskStart, taskProcess, taskEnd });
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  profileGet,
};
