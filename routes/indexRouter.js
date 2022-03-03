const router = require('express').Router();
const homeRouter = require('./homeRouter');
const registrationRouter = require('./registrationRouter');
const loginRouter = require('./loginRouter');
const logoutRouter = require('./logoutRouter');
const boardRouter = require('./boardRouter');
const profileRouter = require('./profileRouter');
const chatRouter = require('./chatRouter');

router.use('/', homeRouter);
router.use('/registration', registrationRouter);
router.use('/login', loginRouter);
router.use('/logout', logoutRouter);
router.use('/board', boardRouter);
router.use('/profile', profileRouter);
router.use('/chat', chatRouter);

module.exports = router;
