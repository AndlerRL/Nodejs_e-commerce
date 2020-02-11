const Sequelize = require('sequelize');

const sequelize = require('../util/db');
const User = sequelize.define('user', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  firstname: Sequelize.STRING,
  lastname: Sequelize.STRING,
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  }
});

module.exports = User;