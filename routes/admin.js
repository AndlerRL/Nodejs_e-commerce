const path = require('path');
const express = require('express');
const crypto = require('crypto');

const rootDir = require('../util/path');
const router = express.Router();
const products = [];

// /admin/add-product => GET
router.get('/add-product', (req, res, next) => {
  res.render('add-product', {
    pageTitle: 'Add product | Admin',
    path: '/add-product',
  })
});

// /admin/add-product => POST
router.post('/add-product', (req, res, next) => {
  const date = new Date();

  products.push({
    ...req.body,
    id: crypto.createHash('sha1').update(`${date.toDateString()}-${date.toTimeString()}`).digest('hex')
  });

  res.redirect('/')
})

exports.routes = router;
exports.products = products;