require('dotenv').config();
const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const { config, sessionParser } = require('./config/config');
const indexRouter = require('./routes/indexRouter');
const { webSocet } = require('./webSocet');

const PORT = process.env.PORT || 3000;

const app = express();

config(app);

const httpServer = createServer(app);

const io = new Server(httpServer);

app.use('/', indexRouter);

app.get('*', (req, res) => {
  res.status(404);
});

webSocet(io, sessionParser);

httpServer.listen(PORT);

module.exports = io;
