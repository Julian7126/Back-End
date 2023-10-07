import ProductDTO from '../DAO/DTO/products.dto.js';
import logger from "../middleware/logger/configLogger.js"

export default class ProductService {
  constructor(dao) {
    this.dao = dao;
  }

  createNewProduct = async (productData) => {
    if (!productData.code) {
      productData.code = Math.floor(Math.random() * 100000);
    }

    const existingProduct = await this.dao.findProductByCode(productData.code);
    if (existingProduct) {
      logger.error('El producto con este código ya existe');
    }

    if (productData.stock < 5 && productData.demand > 50) {
      productData.price *= 1.1;
    }

    const productToCreate = new ProductDTO(productData);
    if (productToCreate.stock >= 100) {
      logger.error("El stock no puede ser mayor o igual a 100");
    }

    const createdProduct = await this.dao.create(productToCreate);
    return createdProduct;
  }

  deleteExistingProduct = async (productId) => {
    const deletedProduct = await this.dao.delete(productId);
    if (deletedProduct.deletedCount === 0) {
      logger.error('Producto no encontrado');
    }
    return true;
  }

  updateProductStock = async (productId, newStock) => {
    const existingProduct = await this.dao.findProductById(productId);
    if (!existingProduct) {
      logger.error('Producto no encontrado');
    }
                                           
    const updatedProduct = await this.dao.update(productId, { stock: newStock });
  
    if (!updatedProduct) {
     logger.error('Error al actualizar el stock del producto');
    }
  
    return updatedProduct;
  };

  findProductById = async (productId) => {
    const product = await this.dao.findProductById(productId);
    if (!product) {
      logger.error('Producto no encontrado');
    }
    return product;
  }





  


  
}


