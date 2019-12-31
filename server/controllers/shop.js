const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getHome = (req, res, next) => {
  Product.findAll().then(products => {
    res.render('shop/index', {
      products,
      pageTitle: 'Shop | Home',
      path: '/',
    });
  }).catch(err => console.error(err));
}

exports.getProducts = (req, res, next) => {
  Product.findAll().then(products => {
    res.render('shop/product-list', {
      products,
      pageTitle: 'Shop | Catalog',
      path: '/catalog',
    })
  }).catch(err => console.log(err));
}

exports.getProductDetail = (req, res, next) => {
  const { productId } = req.params;

  /** Querying from findAll() DOC: https://sequelize.org/master/manual/querying.html
   * Product.findAll({ 
   *  where: { id: productId }
   * }).then(products => {
   *  res.render('shop/product-detail', {
   *    product: products[0],
   *    pageTitle: `Product | ${products[0].title}`,
   *    path: `/catalog/${productId}`
   *  });
   * }
   * ).catch(err => console.error(err))
   * 
   * Is preferable to use findByPk() if is only one item that I'm looking for,
   * otherwise if is needed a new array from all items, Querying is the solution.
   */
  Product.findByPk(productId).then(product => {
    res.render('shop/product-detail', {
      product,
      pageTitle: `Product | ${product.title}`,
      path: `/catalog/${productId}`
    });
  }).catch(err => console.log(err));
}

exports.getCart = (req, res, next) => {
  Cart.getProducts(cart => {
    Product.findAll().then(products => {
      const cartProducts = [];
      for (product of products) {
        const cartProductData = cart.products.find(p => p.id == product.id);
        if (cartProductData) cartProducts.push({ productData: product, quantity: cartProductData.quantity })
      }

      console.log('Cart PRODUCTS', cartProducts);

      res.render('shop/cart', {
        products: cartProducts,
        pageTitle: 'Shop | Cart',
        path: '/cart'
      });
    }).catch(err => console.error(err));
  });
}

exports.getCartItems = (req, res, next) => {
  Cart.getProducts(cart => {
    Product.findAll().then(products => {
      console.log(products)
      const cartProducts = [];
      for (product of products) {
        const cartData = cart.products.find(p => p.id === product.id);
        if (cartData) cartProducts.push({ productData: product })
      }

      res.render(null, {
        cartLength: cartProducts.length,
        path: '',
        pageTitle: ''
      });
    })
  })
}

exports.postCart = (req, res, next) => {
  const id = req.body.productId;
  Product.findByPk(id).then(product => {
    Cart.addProduct(id, product.price);
    res.redirect('/cart');
  }).catch(err => console.error(err));
}

exports.deleteCartItem = (req, res, next) => {
  const { id } = req.body;

  Product.findById(id, product => {
    Cart.deleteProduct(id, product.price);

    res.redirect('/cart');
  });

};

exports.getOrders = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/orders', {
      products,
      pageTitle: 'Shop | Orders',
      path: '/orders'
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