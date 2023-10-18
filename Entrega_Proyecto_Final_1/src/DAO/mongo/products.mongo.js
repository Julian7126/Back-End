import productsModel from './models/products.models.js';

export default class ProductsMongo {
  
  
  async create(user, product) {
    const productToCreate = { ...product, owner: user.email };
    return await productsModel.create(productToCreate);
  }
  

  async delete(_id) {
    return await productsModel.findByIdAndDelete(_id);
  } 

  
  
  async findProductByCode(productCode) {
    return await productsModel.findOne({ code: productCode });
  }

  async findProductById(_id) {
    return await productsModel.findById(_id);
  }

  async update(_id, updatedFields) {
    return await productsModel.findByIdAndUpdate(_id, updatedFields, { new: true });

  }

}
