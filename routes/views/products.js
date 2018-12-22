const express = require('express');
const router = express.Router();
const ProductService = require('../../services/product.service');

router.get('/', async (req, res) => {
  const product = await ProductService.getProducts();
  res.render('products', { products });
});

module.exports = router;
