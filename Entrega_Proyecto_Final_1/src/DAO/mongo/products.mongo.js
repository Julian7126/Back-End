// products.mongo.js
import productsModel from './models/products.models.js';

export default class ProductsMongo {
  static async create(productData) {
    return await productsModel.create(productData);
  }

  static async delete(productId) {
    return await productsModel.deleteOne({ _id: productId });
  }

  static async findProductByCode(productCode) {
    return await productsModel.findOne({ code: productCode });
  }

}
