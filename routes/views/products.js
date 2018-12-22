const express = require('express');
const router = express.Router();
const ProductService = require('../../services/product.service');

const productService = new ProductService();

router.get('/', async (req, res) => {
  const { tags } = req.query;
  const products = await productService.getProducts({ tags });
  res.render('products', { products });
});

module.exports = router;
