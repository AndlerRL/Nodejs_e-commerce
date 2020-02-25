const { DataTypes } = require('sequelize');

const sequelize = require('../util/db');

const CartItem = sequelize.define('cartItem', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV1,
    allowNull: false,
    primaryKey: true
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = CartItem;