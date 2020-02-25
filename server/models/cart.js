const { DataTypes } = require('sequelize');

const sequelize = require('../util/db');

const Cart = sequelize.define('cart', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV1,
    allowNull: false,
    primaryKey: true
  }
});

module.exports = Cart;