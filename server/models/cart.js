const Sequelize = require('sequelize');

const sequelize = require('../util/db');

const Cart = sequelize.define('cart', {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV1,
    allowNull: false,
    primaryKey: true
  }
});

module.exports = Cart;