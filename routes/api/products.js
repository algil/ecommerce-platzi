const express = require('express');
const router = express.Router();
const ProductService = require('../../services/product.service');

const productService = new ProductService();

router.get('/', async (req, res) => {
  const { tags } = req.query;
  const products = await productService.getProducts({ tags });

  res.send({
    data: products,
    message: 'products listed'
  });
});

router.get('/:productId', async (req, res) => {
  const { productId } = req.params;
  const product = await productService.getProduct({ productId });

  res.send({
    data: product,
    message: 'product retrieve'
  });
});

router.post('/', async (req, res) => {
  const { body: product } = req;
  const createdProduct = await productService.createProduct({ product });

  res.status(201).send({
    data: createdProduct,
    message: 'product created'
  });
});

router.put('/:productId', async (req, res) => {
  const { productId } = req.params;
  const { body: product } = req;
  const updatedProduct = await productService.updateProduct({
    productId,
    product
  });

  res.send({
    data: updatedProduct,
    message: 'product updated'
  });
});

router.delete('/:productId', async (req, res) => {
  const { productId } = req.params;
  const product = await productService.deleteProduct({ productId });

  res.send({
    data: product,
    message: 'product deleted'
  });
});

module.exports = router;
