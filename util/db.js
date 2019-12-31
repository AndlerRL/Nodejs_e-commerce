const Sequelize = require('sequelize');

const sequelize = new Sequelize(`nodejs_ecommerce`, `root`, `Meynorromero-94.`, {
  dialect: 'mysql',
  host: 'localhost'
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