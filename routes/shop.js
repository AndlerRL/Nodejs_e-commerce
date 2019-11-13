const path = require('path');
const express = require('express');

const router = express.Router();
const shopController = require('../controllers/shop')

router.get('/', shopController.getHome);
router.get('/catalog', shopController.getProducts);
router.get('/cart', shopController.getCart);
router.get('/product-detail', shopController.getProductDetail);
router.get('/checkout', shopController.getCheckout);

module.exports = router;