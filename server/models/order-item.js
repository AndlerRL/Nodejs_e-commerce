const Sequelize = require('sequelize');

const sequelize = require('../util/db');

const OrderItem = sequelize.define('orderItem', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    allowNull: false,
    primaryKey: true
  }
});

module.exports = OrderItem;