const fs = require('fs');
const path = require('path');
const rootDir = require('../util/path');

const p = path.join(rootDir, 'data', 'cart.json');

module.exports = class Cart {
  static addProduct(id, productPrice) {
    // Fetch the previous cart
    fs.readFile(p, (err, fileContent) => {
      let cart = {
        products: [],
        totalPrice: 0
      }

      if (!err) cart = JSON.parse(fileContent)

      // Analyze the cart => Find existing product
      const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;

      // Add new product / increase quantity
      if (existingProduct) {
        updatedProduct = { ...existingProduct }
        updatedProduct.quantity = updatedProduct.quantity + 1;
        cart.products = [ ...cart.products ];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { 
          id,
          quantity: 1
        }
        cart.products = [
          ...cart.products,
          updatedProduct
        ]
      }

      cart.totalPrice = cart.totalPrice + +productPrice;

      fs.writeFile(p, JSON.stringify(cart), err => {
        if (err) throw new Error(`Whoops, an error has occur:\n${err}`)
      })
    })
  }

  static deleteProduct(id, price) {
    fs.readFile(p, (err, cart) => {
      if (err) throw new Error(`Whoops, an error just occur now:\n${err}`)

      const updatedCart = { ...JSON.parse(cart) };
      const product = updatedCart.products.find(p => p.id === id);
      
      if (!product) return;
      
      const { quantity, price } = product;

      updatedCart.products = updatedCart.products.filter(p => p.id !== id);
      updatedCart.totalPrice = cart.totalPrice - (price * quantity);

      fs.writeFile(p, JSON.stringify(updatedCart), err => {
        if (err) throw new Error(`Whoops, an error has occur:\n${err}`)
      })
    });
  }

  static getProducts(callback) {
    fs.readFile(p, (err, fileContent) => {
      const cart = JSON.parse(fileContent);

      if (err) callback(null);

      callback(cart);
    });
  } 
}