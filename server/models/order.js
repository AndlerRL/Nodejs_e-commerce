const { DataTypes } = require('sequelize');

const sequelize = require('../util/db');

const Order = sequelize.define('order', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV1,
    allowNull: false,
    primaryKey: true
  }
});

module.exports = Order;