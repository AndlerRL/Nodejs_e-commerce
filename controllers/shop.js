const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getHome = (req, res, next) => {
  Product.fetchAll().then(([rows, fieldData]) => {
    res.render('shop/index', {
      products: rows,
      pageTitle: 'Shop | Home',
      path: '/',
    })
  }).catch(err => console.log(err));
}

exports.getProducts = (req, res, next) => {
  Product.fetchAll().then(([rows, fieldData]) => {
    res.render('shop/product-list', {
      products: rows,
      pageTitle: 'Shop | Catalog',
      path: '/catalog',
    })
  }).catch(err => console.log(err));
}

exports.getProductDetail = (req, res, next) => {
  const { productId } = req.params;

  Product.findById(productId).then(([rows, fieldData]) => {
    res.render('shop/product-detail', {
      product: rows[0],
      pageTitle: `Product | ${rows[0].title}`,
      path: `/catalog/${productId}`
    });
  }).catch(err => console.log(err));
}

exports.getCart = (req, res, next) => {
  Cart.getProducts(cart => {
    Product.fetchAll(products => {
      const cartProducts = [];
      for (product of products) {
        const cartProductData = cart.products.find(p => p.id === product.id);
        console.log(cartProductData)
        if (cartProductData) cartProducts.push({ productData: product, quantity: cartProductData.quantity })
      }

      res.render('shop/cart', {
        products: cartProducts,
        pageTitle: 'Shop | Cart',
        path: '/cart'
      });
    });
  });
}

exports.getCartItems = (req, res, next) => {
  Cart.getProducts(cart => {
    Product.fetchAll(products => {
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
  Product.findById(id, product => {
    Cart.addProduct(id, product.price);
    res.redirect('/cart');
  })
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