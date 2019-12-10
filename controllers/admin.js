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
  product.save();

  res.redirect('/');
}

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  
  if (!editMode) {
    res.redirect('/');
  }

  const id = req.params.productId;

  Product.findById(id, product => {
    if (!product) {
      return res.redirect('/');
    }
    console.log(product)
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product | Admin',
      path: '/admin/edit-product',
      editing: editMode,
      product
    })
  })

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
  Product.fetchAll(products => {
    res.render('admin/product-list', {
      products,
      pageTitle: 'Admin | Catalog',
      path: '/admin/product-list',
    })
  });
}

exports.deleteProduct = (req, res, next) => {
  const { id } = req.body;

  Product.deleteProductById(id, () => {
    res.redirect('/admin/product-list')
  })

}