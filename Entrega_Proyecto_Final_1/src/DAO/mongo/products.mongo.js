import productsModel from './models/products.models.js';

export default class ProductsMongo {
  async create(user, productData) {
    if (user.role === "admin" || user.role === "premium") {
      productData.owner = user.email;
      return await productsModel.create(productData);
    } else {
      throw new Error("Solo los usuarios admin o premium pueden crear productos.");
    }
  }

  async delete(productId) {
    return await productsModel.findByIdAndDelete(productId);
  }

  async findProductByCode(productCode) {
    return await productsModel.findOne({ code: productCode });
  }

  async findProductById(productId) {
    return await productsModel.findById(productId);
  }

  async update(productId, updatedFields) {
    return await productsModel.findByIdAndUpdate(productId, updatedFields, { new: true });

  }

}
