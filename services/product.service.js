const productMocks = require('../utils/mocks/products');

class ProductService {
  constructor() {}

  static getProducts({ tags }) {
    return productMocks;
  }

  static getProduct({ productId }) {
    return productMocks[0];
  }

  static createProduct({ product }) {
    return productMocks[0];
  }

  static updateProduct({ productId, product }) {
    return productMocks[0];
  }

  static deleteProduct({ productId }) {
    return productMocks[0];
  }
}

module.exports = ProductService;
