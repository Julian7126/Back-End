// products.mongo.js
import productsModel from './models/products.models.js';

export default class ProductsMongo {
  
  static async createNewProduct(productData) {
    return await productsModel.create(productData);
  }

  static async deleteExistingProduct(productId) {
    const result = await productsModel.deleteOne({ _id: productId });
    if (result.deletedCount === 0) {
      throw new Error('Producto no encontrado');
    }
    return true;
  }
}
