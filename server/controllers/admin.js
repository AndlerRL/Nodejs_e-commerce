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
  const { uuid } = req.user;
  req.user.createProduct({
    title,
    imageUrl,
    price,
    description,
  }).then(result => {
    console.info(`${result.title} Product has been added to DB successfully, linked with the User with ID ${uuid}`);
    res.redirect('/admin/product-list');
  }).catch(err => {
    console.error(err)
  });
}

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  
  if (!editMode) {
    res.redirect('/');
  }

  const { productId } = req.params;

  Product.findByPk(productId).then(product => {
    if (!product) {
      return res.redirect('/');
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product | Admin',
      path: '/admin/edit-product',
      editing: editMode,
      product
    })
  }).catch(err => console.log(err))
}

exports.postEditProduct = (req, res, next) => {
  const { title, imageUrl, price, description, id } = req.body
  
  Product.findByPk(id).then(product => {
    product.title = title;
    product.imageUrl = imageUrl;
    product.price = price;
    product.description = description;
    
    return product.save();
  }).then(result => {
    res.redirect('/admin/product-list');
  }).catch(err => console.error(err));
}

exports.getAdminProducts = (req, res, next) => {
  Product.findAll().then(products => {
    res.render('admin/product-list', {
      products,
      pageTitle: 'Admin | Catalog',
      path: '/admin/product-list',
    })
  }).catch(err => console.log(err));
}

exports.deleteProduct = (req, res, next) => {
  const { id } = req.body;
  /**
   * Product.findByPk(id).then(product => {
   *   return product.destroy();
   * }).then(result => {
   *   res.redirect('/admin/product-list')
   * }).catch(err => console.error(err));
   */
  Product.destroy({
    where: { id }
  }).then(() => {
    console.info(`Product with ID ${id} has been deleted successfully.`)
    res.redirect('/admin/product-list')
  }).catch(err => console.log(err));
}