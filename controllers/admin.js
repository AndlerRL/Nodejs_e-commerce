const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/add-product', {
    pageTitle: 'Add product | Admin',
    path: '/admin/add-product',
  })
}

exports.postAddProduct = (req, res, next) => {
  const product = new Product(
    req.body.title,
    req.body.price,
    req.body.description
  );
  product.save();

  res.redirect('/');
}

exports.getEditProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Edit Product | Admin',
    path: '/admin/edit-product'
  })
}

exports.putEditProduct = (req, res, next) => {

  res.redirect('/');
}

exports.getAdminProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('admin/product-list', {
      products,
      pageTitle: 'Admin | Catalog',
      path: '/admin/product-list',
    })
  });
}