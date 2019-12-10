const path = require('path');
const express = require('express');

const router = express.Router();
const shopController = require('../controllers/shop')

// router.get('*', shopController.getCartItems);

router.get('/', shopController.getHome);

router.get('/catalog', shopController.getProducts);
router.get('/catalog/:productId', shopController.getProductDetail);

router.get('/cart', shopController.getCart);
router.post('/add-to-cart', shopController.postCart);
router.post('/cart-delete-item', shopController.deleteCartItem);

router.get('/orders', shopController.getOrders);

router.get('/checkout', shopController.getCheckout);

module.exports = router;