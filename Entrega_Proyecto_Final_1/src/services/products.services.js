import ProductDTO from '../DAO/DTO/products.dto.js';

export default class ProductRepository {
  constructor(productsDAO) {
    this.productsDAO = productsDAO;
  }


  createNewProduct = async (productData) => {
    const productToCreate = new ProductDTO(productData);
    return await this.productsDAO.createNewProduct(productToCreate);
  }


  deleteExistingProduct = async (productId) => {
    return await this.productsDAO.deleteExistingProduct(productId);
  }

}
