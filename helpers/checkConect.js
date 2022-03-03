const { sequelize } = require('../db/models');

const checkConect = async (PORT) => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    console.log('server up', PORT);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

module.exports = checkConect;
