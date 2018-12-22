const express = require('express');
const router = express.Router();
const ProductService = require('../../services/product.service');

router.get('/', async (req, res) => {
  const { tags } = req.query;
  const products = await ProductService.getProducts({ tags });

  res.send({
    data: products,
    message: 'products listed'
  });
});

router.get('/:productId', async (req, res) => {
  const { productId } = req.params;
  const product = await ProductService.getProduct({ productId });

  res.send({
    data: product,
    message: 'product retrieve'
  });
});

router.post('/', async (req, res) => {
  const { body: product } = req;
  const createdProduct = await ProductService.createProduct({ product });

  res.status(201).send({
    data: createdProduct,
    message: 'product created'
  });
});

router.put('/:productId', async (req, res) => {
  const { productId } = req.params;
  const { body: product } = req;
  const updatedProduct = await ProductService.updateProduct({
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
  const product = await ProductService.deleteProduct({ productId });

  res.send({
    data: product,
    message: 'product deleted'
  });
});

module.exports = router;
