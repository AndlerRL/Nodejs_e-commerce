const { Sequelize } = require('sequelize');
const mysql2 = require('mysql2');

// new Sequelize(db, user, pw, opt);
const prod = process.env.NODE_ENV === 'production';
const db = prod ? 'ssxahsbhdjzhphao' : 'nodejs_ecommerce';
const user = prod ? 'ngx2x5avhsgi9ofw' : 'root';
const pw = prod ? 'xr33ezy0hev6op7l' : 'Meynorromero-94.';
const host = prod ? 'hcm4e9frmbwfez47.cbetxkdyhwsb.us-east-1.rds.amazonaws.com' : 'localhost'

const sequelize = new Sequelize(db, user, pw, {
  dialect: 'mysql',
  dialectModule: mysql2,
  host: host
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