const Sequelize = require('sequelize');

const sequelize = require('../util/db');

const Order = sequelize.define('order', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    allowNull: false,
    primaryKey: true
  }
});

module.exports = Order;