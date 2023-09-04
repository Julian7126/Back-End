import productsModel from '../models/products.models.js';

export const createNewProduct = async (productData) => {
  const createdProduct = await productsModel.create(productData);
  return createdProduct;
};

export const deleteExistingProduct = async (productId) => {
  const result = await productsModel.deleteOne({ _id: productId });
  if (result.deletedCount === 0) {
    throw new Error('Producto no encontrado');
  }
  return true;
};
