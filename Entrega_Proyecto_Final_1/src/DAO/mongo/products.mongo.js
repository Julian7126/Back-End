import productsModel from './models/products.models.js';

export default class ProductsMongo {
  
  
  async create(user, product) {
    const productToCreate = { ...product, owner: user.email };
    return await productsModel.create(productToCreate);
  }
  

  async delete(user, productId) {
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
