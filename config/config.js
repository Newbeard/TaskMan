const express = require('express');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');
const hbs = require('hbs');
const sessionConfig = require('./sessionConfig');
const isSession = require('../middleware/isSession');
const cookiesCleaner = require('../middleware/cookiesCleaner');

const sessionParser = session(sessionConfig);

const config = (app) => {
  // USE
  app.use(helmet());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(path.join(process.env.PWD, 'public')));
  hbs.registerPartials(path.join(process.env.PWD, 'views', 'partials'));
  app.use(cookieParser());
  app.use(sessionParser);
  app.use(isSession);
  app.use(cookiesCleaner);

  // SET
  app.set('view engine', 'hbs');
};

module.exports = { config, sessionParser };
