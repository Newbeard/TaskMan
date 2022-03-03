const { checkIsSession } = require('../middleware/sessionIsCheck');

const chatController = ('/chat', checkIsSession, (req, res) => {
  res.render('chat');
});

module.exports = { chatController };
