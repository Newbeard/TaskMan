const { checkIsSession } = require('../middleware/sessionIsCheck');

const chatController = (req, res) => {
  res.render('partials/chat');
};

module.exports = { chatController };
