const Product = require('../models/product');


exports.getHome = (req, res, next) => {
  Product.findAll().then(products => {
    res.render('shop/index', {
      products,
      pageTitle: 'Shop | Home',
      path: '/',
    });
  }).catch(err => console.error(err));
}

exports.getLogin = (req, res, next) => {
  res.render('shop/login', {
    pageTitle: 'Shop4Any | Login',
    path: '/login',
  })
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
  req.user.getCart().then(cart => {
    return cart.getProducts().then(products => {
      res.render('shop/cart', {
        products,
        pageTitle: 'Shop | Cart',
        path: '/cart'
      });
    }).catch(err => console.log(err));
  }).catch(err => console.log(err));
}

exports.getCartItems = (req, res, next) => {
  req.user.getCart().then(cart => {
    return cart.getProducts().then(products => {
      res.render('shop/cart', {
        products,
        pageTitle: 'Shop | Cart',
        path: '/cart'
      });
    }).catch(err => console.log(err));
  }).catch(err => console.log(err));
  /* Cart.getProducts(cart => {
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
  }) */
}

exports.postCart = (req, res, next) => {
  const id = req.body.productId;
  let fetchedCart;
  let newQty = 1;

  req.user.getCart().then(cart => {
    fetchedCart = cart;

    return cart.getProducts({ where: { id } });
  }).then(products => {
    let product;

    if (products.length > 0)
      product = products[0];

    if (product) {
      const oldQty = product.cartItem.quantity;
      newQty = oldQty + 1;
      return product;
    }

    return Product.findByPk(id);
  }).then(product => {
    return fetchedCart.addProduct(product, {
      through: { quantity: newQty }
    });
  }).then(() => {
    res.redirect('/cart');
  }).catch(err => console.log(err));
}

exports.deleteCartItem = (req, res, next) => {
  const { id } = req.body;

  req.user.getCart().then(cart => {
    return cart.getProducts({ 
      where: { id }
    })
  }).then(products => {
    const product = products[0];

    return product.cartItem.destroy();
  }).then(result => {
    res.redirect('/cart')
  }).catch(err => console.log(err));
};

exports.deleteCart = (req, res, next) => {
  req.user.getCart().then(cart => {
    return cart.destroy();
  }).then(result => {
    res.render('includes/confirm', {
      pageTitle: `Shop4Any | Confirm`,
      path: `/cart-delete`,
      redirect: `/cart`,
      background: `confirm.jpg`
    });
  }).catch(err => console.log(err));
};

exports.postOrder = (req, res, next) => {
  let fetchedCart;

  req.user.getCart()
    .then(cart =>{
      fetchedCart = cart;

      return cart.getProducts();
    })
    .then(products => 
      req.user
        .createOrder()
        .then(order => 
          order.addProducts(products.map(p => {
              p.orderItem = {
                ...p.orderItem,
                quantity: p.cartItem.quantity
              };
              
              return p;
            }))
        )
        .catch(err => console.log(err))
    )
    .then(result =>
      fetchedCart.setProducts(null)
    )
    .then(result => 
      res.redirect('/orders')
    )
    .catch(err => console.log.apply(err));
};

exports.getOrders = (req, res, next) => {
  req.user
    .getOrders({
      include: ['products']
    })
    .then(orders => {
      res.render('shop/orders', {
        orders,
        pageTitle: 'Shop | Orders',
        path: '/orders'
      });
    })
    .catch(err => console.log(err));
}

exports.getCheckout = (req, res, next) => {
  Product.findAll().then(products => {
    res.render('shop/checkout', {
      products,
      pageTitle: 'Shop | Product Detail',
      path: '/checkout'
    })
  }).catch(err => console.error(err));
}