const express = require('express');
const router = express.Router();
const ProductService = require('../../services/product.service');

const productService = new ProductService();

router.get('/', async (req, res, next) => {
  try {
    const { tags } = req.query;
    const products = await productService.getProducts({ tags });
    res.render('products', { products });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
