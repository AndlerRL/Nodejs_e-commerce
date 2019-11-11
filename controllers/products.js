const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/add-product', {
    pageTitle: 'Add product | Admin',
    path: '/add-product',
  })
}

exports.postAddProduct = (req, res, next) => {
  const product = new Product(
    req.body.title,
    req.body.price,
    req.body.description
  );
  product.save();

  res.redirect('/')
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