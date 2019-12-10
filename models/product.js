const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const rootDir = require('../util/path');

const Cart = require('./cart');

const p = path.join(rootDir, 'data', 'products.json');

const getProductsFromFile = callback => {
  fs.readFile(p, (err, data) => {
    if (!err) {
      callback(JSON.parse(data));
    } else {
      callback([]);
    }
  });
}

module.exports = class Product {
  constructor(t, i, p, d, id) {
    this.title = t;
    this.imageUrl = i;
    this.price = parseFloat(p);
    this.description = d;
    this.id = id;
  }
  
  save() {
    const date = new Date();
    
    getProductsFromFile(products => {
      if (this.id) {
        const existingProductIndex = products.findIndex(prod => prod.id === this.id);
        const updatedProducts = [...products];
        updatedProducts[existingProductIndex] = this;

        fs.writeFile(p, JSON.stringify(updatedProducts), err => {
          if (err) throw new Error(`Whoops, a new error has occur:\n${err}`);
        });
      } else {
        this.id = crypto.createHash('md5').update(`${date.toDateString()}-${date.toTimeString()}`).digest('hex');
        products.push(this);
  
        fs.writeFile(p, JSON.stringify(products), err => {
          if (err) throw new Error(`Whoops, a new error has occur:\n${err}`);
        });
      }
    })
  }

  static fetchAll(callback) {
    getProductsFromFile(callback);
  }

  static findById(id, callback) {
    getProductsFromFile(products => {
      const product = products.find(p => p.id === id)

      callback(product);
    });
  }

  static deleteProductById(id, callback) {
    getProductsFromFile(products => {
      const product = products.find(p => p.id === id);
      const updatedProducts = products.filter(p => p.id !== id);

      fs.writeFile(p, JSON.stringify(updatedProducts), err => {
        if (err) throw new Error(`Whoops, a new error has occur:\n${err}`);

        callback(Cart.deleteProduct(id, product.totalPrice))
      });
    })
  }
}