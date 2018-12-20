const express = require('express');
const router = express.Router();
const productMocks = require('../../utils/mocks/products');

router.get('/', (req, res) => {
  const { query } = req.query;
  res.send({
    data: productMocks,
    message: 'products listed'
  });
});

router.get('/:productId', (req, res) => {
  const { productId } = req.params;
  res.send({
    data: productMocks[0],
    message: 'product retrieve'
  });
});

router.post('/', (req, res) => {
  // const { product } = req.body;
  res.status(201).send({
    data: productMocks[0],
    message: 'product created'
  });
});

router.put('/:productId', (req, res) => {
  const { productId } = req.params;
  res.send({
    data: productMocks[0],
    message: 'product updated'
  });
});

router.delete('/:productId', (req, res) => {
  const { productId } = req.params;
  res.send({
    data: productMocks[0],
    message: 'product deleted'
  });
});

module.exports = router;
