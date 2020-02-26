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

router.post('/order-create', shopController.postOrder);
router.post('/cancel-order', shopController.cancelOrder);
router.get('/orders', shopController.getOrders);

router.get('/checkout', shopController.getCheckout);

router.get('/login', shopController.getLogin);
// router.post('/login', shopController.postLogin);

module.exports = router;