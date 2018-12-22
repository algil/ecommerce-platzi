const BaseDao = require('../dao/base.dao');

class ProductService {
  constructor() {
    this.collection = 'products';
    this.dao = new BaseDao();
  }

  async getProducts({ tags }) {
    const query = tags && { tags: { $in: tags } };
    const products = await this.dao.getAll(this.collection, query);
    return products || [];
  }

  async getProduct({ productId }) {
    const product = await this.dao.get(this.collection, productId);
    return product || {};
  }

  async createProduct({ product }) {
    return await this.dao.create(this.collection, product);
  }

  async updateProduct({ productId, product }) {
    return await this.dao.update(this.collection, productId, product);
  }

  async deleteProduct({ productId }) {
    return await this.dao.delete(this.collection, productId);
  }
}

module.exports = ProductService;
