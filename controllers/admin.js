const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add product | Admin',
    path: '/admin/add-product',
    editing: false,
  })
}

exports.postAddProduct = (req, res, next) => {
  const { title, imageUrl, price, description } = req.body
  const product = new Product(
    title,
    imageUrl,
    price,
    description,
    null
  );
  product.save().then(() => {
    res.redirect('/');
  }).catch(err => console.log(err));
}

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  
  if (!editMode) {
    res.redirect('/');
  }

  const { productId } = req.params;

  Product.findById(productId).then(([rows, fieldData]) => {
    if (!rows) {
      return res.redirect('/');
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product | Admin',
      path: '/admin/edit-product',
      editing: editMode,
      product: rows[0]
    })
  }).catch(err => console.log(err))
}

exports.postEditProduct = (req, res, next) => {
  const { title, imageUrl, price, description, id } = req.body
  const updatedProduct = new Product(
    title,
    imageUrl,
    price,
    description,
    id
  );
  updatedProduct.save();

  res.redirect('/admin/product-list');
}

exports.getAdminProducts = (req, res, next) => {
  Product.fetchAll().then(([rows, fieldData]) => {
    res.render('admin/product-list', {
      products: rows,
      pageTitle: 'Admin | Catalog',
      path: '/admin/product-list',
    })
  }).catch(err => console.log(err));
}

exports.deleteProduct = (req, res, next) => {
  const { id } = req.body;

  Product.deleteProductById(id).then(() => {
    res.redirect('/admin/product-list')
  }).catch(err => console.log(err));
}