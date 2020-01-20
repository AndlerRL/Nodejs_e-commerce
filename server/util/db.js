const Sequelize = require('sequelize');
const mysql2 = require('mysql2');

// new Sequelize(db, user, pw, opt);
const sequelize = new Sequelize(process.env.NODE_ENV === 'production' ? 'ssxahsbhdjzhphao' : `nodejs_ecommerce`, `ngx2x5avhsgi9ofw`, `xr33ezy0hev6op7l`, {
  dialect: 'mysql',
  dialectModule: mysql2,
  host: process.env.NODE_ENV === 'production' ? 'hcm4e9frmbwfez47.cbetxkdyhwsb.us-east-1.rds.amazonaws.com' : 'localhost'
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