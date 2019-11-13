const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const rootDir = require('../util/path');

const p = path.join(rootDir, 'data', 'products.json');

const getProductsFromFile = callback => {
  fs.readFile(p, (err, data) => {
    if (!err) {
      callback(JSON.parse(data));
      console.log(JSON.parse(data));
    } else {
      callback([]);
    }
  });
}

module.exports = class Product {
  constructor(t, p, d) {
    const date = new Date();

    this.title = t;
    this.price = p;
    this.description = d;
    this.id = crypto.createHash('md5').update(`${date.toDateString()}-${date.toTimeString()}`).digest('hex')
  }

  save() {
    getProductsFromFile(products => {
      products.push(this);

      fs.writeFile(p, JSON.stringify(products), err => {
        console.error(err);
      });
    })
  }

  static fetchAll(callback) {
    getProductsFromFile(callback);
  }
}