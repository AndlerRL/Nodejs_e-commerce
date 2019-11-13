const Product = require('../models/product');

let productID = null;

if (typeof localStorage === "undefined" || localStorage === null) {
  LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./data');
}

exports.getHome = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/index', {
      products,
      pageTitle: 'Shop | Home',
      path: '/',
    })
  });
}

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/product-list', {
      products,
      pageTitle: 'Shop | Catalog',
      path: '/catalog',
    })
  });
}

exports.getProductDetail = (req, res, next) => {
  console.log('P R O D U C T I D', productID)
  Product.fetchAll(products => {
    res.render('shop/product-detail', {
      products,
      pageTitle: 'Shop | Product Detail',
      path: '/product-detail'
    })
  })
}

exports.getCart = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/cart', {
      products,
      pageTitle: 'Shop | Cart',
      path: '/cart'
    })
  })
}

exports.getCheckout = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/checkout', {
      products,
      pageTitle: 'Shop | Product Detail',
      path: '/checkout'
    })
  })
}