import ProductDTO from '../DAO/DTO/products.dto.js';
import logger from "../middleware/logger/configLogger.js"

export default class ProductService {
  constructor(dao) {
    this.dao = dao;
  }

  
  createNewProduct = async (user, product) => {
    try {
        console.log("Datos del producto recibidos en createNewProduct:", product);

        if (!product.code) {
            product.code = Math.floor(Math.random() * 100000);
        }

        const existingProduct = await this.dao.findProductByCode(product.code);
        if (existingProduct) {
            logger.error('El producto con este código ya existe');
            throw new Error('El producto con este código ya existe');
        }

        if (product.stock < 5 && product.demand > 50) {
            product.price *= 1.1;
        }

        const productToCreate = new ProductDTO(product);
        if (productToCreate.stock >= 100) {
          logger.error("El stock no puede ser mayor o igual a 100");
          throw new Error("El stock no puede ser mayor o igual a 100");
        }

        if (user.role === "admin" || user.role === "premium") {
            const createdProduct = await this.dao.create(user, productToCreate);
            logger.info(`producto creado con exito , gracias por aportar nueva mercaderia ${user.email}`)
            logger.info("producto que se esta creando", createdProduct)
            return createdProduct;
        } else {
          logger.error("Solo los usuarios admin o premium pueden crear productos.");
        }
    } catch (err) {
        logger.error("Error en createNewProduct:", err);
        throw err;
    }
}




deleteExistingProduct = async (_id) => { 
  try {
    const product = await this.dao.findProductById(_id);
    
    if (!product) {
      logger.error('Producto no encontrado');
      throw new CustomError(EErrors.PRODUCT_NOT_FOUND, 'Producto no encontrado');
    }

    const deletedProduct = await this.dao.delete(_id);
    
    if (!deletedProduct) {
      logger.error('Error al eliminar el producto');
      throw new CustomError(EErrors.INTERNAL_SERVER_ERROR, 'Error al eliminar el producto');
    }
    
    return true;
  } catch (error) {
    logger.error('Error al eliminar el producto:', error);
    throw new CustomError(EErrors.INTERNAL_SERVER_ERROR, 'Error interno del servidor');
  }
};


  updateProductStock = async (_id, newStock) => {
    const existingProduct = await this.dao.findProductById(_id);
    if (!existingProduct) {
      logger.error('Producto no encontrado');
    }
                                           
    const updatedProduct = await this.dao.update(_id, { stock: newStock });
  
    if (!updatedProduct) {
     logger.error('Error al actualizar el stock del producto');
    }
  
    return updatedProduct;
  };

  
  findProductById = async (_id) => {
    const product = await this.dao.findProductById(_id);
    if (!product) {
      logger.error('Producto no encontrado');
    }
    return product;
  }





  


  
}


