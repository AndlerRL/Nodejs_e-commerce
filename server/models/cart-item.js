const Sequelize = require('sequelize');

const sequelize = require('../util/db');

const CartItem = sequelize.define('cartItem', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    allowNull: false,
    primaryKey: true
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

module.exports = CartItem;