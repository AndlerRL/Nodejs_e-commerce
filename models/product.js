// const crypto = require('crypto');
const db = require('../util/db');
const Cart = require('./cart');

module.exports = class Product {
  constructor(t, i, p, d, id) {
    this.title = t;
    this.imageUrl = i;
    this.price = parseFloat(p);
    this.description = d;
    this.id = id;
  }
  
  save() {
    // const date = new Date();
    // this.id = crypto.createHash('md5').update(`${date.toDateString()}-${date.toTimeString()}`).digest('hex');
    const { title, price, description, imageUrl } = this;
    return db.execute(
      `INSERT INTO products (title, price, description, imageUrl) VALUES (?, ?, ?, ?)`,
      [title, price, description, imageUrl]
    );
  }

  static fetchAll() {
    return db.execute('SELECT * FROM products');
  }

  static findById(id) {
    return db.execute(`SELECT * FROM products WHERE id = ?`, id);
  }

  static deleteProductById(id) {
    return db.execute(`DELETE FROM products WHERE id = ?`, id);
  }
}