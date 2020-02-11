const path = require('path');
const express = require('express');

const router = express.Router();
const shopController = require('../controllers/shop')

router.get('/', shopController.getHome);

router.get('/catalog', shopController.getProducts);
router.get('/catalog/:productId', shopController.getProductDetail);

router.get('/cart', shopController.getCart);
router.post('/add-to-cart', shopController.postCart);
router.post('/cart-delete-item', shopController.deleteCartItem);
router.post('/cart-delete', shopController.deleteCart);

router.get('/order-create', shopController.postOrder);
router.get('/orders', shopController.getOrders);

router.get('/checkout', shopController.getCheckout);

router.use((req, res, next) => {
  res.sendFile(path.join(__dirname, '..', '..', 'index.html'));

  next();
});

module.exports = router;