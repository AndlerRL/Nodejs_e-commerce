const Sequelize = require('sequelize');
const mysql2 = require('mysql2');

const sequelize = new Sequelize(process.env.NODE_ENV === 'production' ? 'shop4any' : `nodejs_ecommerce`, `root`, `Meynorromero-94.`, {
  dialect: 'mysql',
  dialectModule: mysql2,
  host: process.env.NODE_ENV === 'production' ? 'shop4any.herokuapp.com' : 'localhost'
});

module.exports = sequelize;

/* const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'nodejs_ecommerce',
  password: 'Meynorromero-94.'
});

module.exports = pool.promise(); */