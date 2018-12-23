const express = require('express');
const router = express.Router();
const ProductService = require('../../services/product.service');
const validationHandler = require('../../middleware/validation.middleware');
const {
  productIdSchema,
  productTagSchema,
  createProductSchema,
  updateProductSchema
} = require('../../utils/validation/product.schema');

const productService = new ProductService();

router.get('/', async (req, res, next) => {
  try {
    const { tags } = req.query;
    const products = await productService.getProducts({ tags });
    res.send({
      data: products,
      message: 'products listed'
    });
  } catch (error) {
    next(error);
  }
});

router.get('/:productId', async (req, res, next) => {
  try {
    const { productId } = req.params;
    const product = await productService.getProduct({ productId });

    res.send({
      data: product,
      message: 'product retrieve'
    });
  } catch (error) {
    next(error);
  }
});

router.post(
  '/',
  validationHandler(createProductSchema),
  async (req, res, next) => {
    try {
      const { body: product } = req;
      const createdProduct = await productService.createProduct({ product });

      res.status(201).send({
        data: createdProduct,
        message: 'product created'
      });
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  '/:productId',
  validationHandler({ productId: productIdSchema }, 'params'),
  validationHandler(updateProductSchema),
  async (req, res, next) => {
    try {
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
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:productId', async (req, res, next) => {
  try {
    const { productId } = req.params;
    const product = await productService.deleteProduct({ productId });

    res.send({
      data: product,
      message: 'product deleted'
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
