const { Post, User } = require('../db/models');

const profileGet = async (req, res) => {
  const { id } = req.session.user;
  try {
    const cards = await Post.findAll({
      where: {
        userId: id,
      },
    });
    res.render('profile', { cards });
  } catch (error) {
    console.error(error);
  }
};

const profileUpdate = async (req, res) => {
  const { id } = req.session.user;
  try {} catch (error) {
    console.error(error);
  }
};

const profileDelete = async (req, res) => {
  const { id } = req.session.user;
  try {} catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

module.exports = { profileGet, profileDelete, profileUpdate };
