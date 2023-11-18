import { productService } from "../services/index.js";
import CustomError from '../services/error/custom_error.js';
import EErrors from '../services/error/enums.js';
import logger from "../middleware/logger/configLogger.js"



export const createProduct = async (req, res, next) => {
  try {
    const product = req.body;
    const user = req.user;
    console.log("Datos del producto recibidos:", product);
    console.log("datos traidos del usuario", user)
    const newProduct = await productService.createNewProduct(user, product);
    console.log("datos traidos del NEWPRODUCT", newProduct)
    res.redirect('/list');
  } catch (err) {
    if (err instanceof CustomError && err.code === EErrors.INVALID_PRODUCT) {
      res.status(400).json({ error: 'Producto inválido' });
    } else {
      logger.error('error al crear un producto:', err);
      next(err);
    }
  }
};


export const deleteProduct = async (req, res, next) => {
  try {
    const { pid } = req.params;
    await productService.deleteExistingProduct(pid);
    res.status(200).json({ message: 'Producto eliminado con éxito' });
  } catch (err) {
    if (err instanceof CustomError && err.code === EErrors.PRODUCT_NOT_FOUND) {
      res.status(404).json({ error: 'Producto no encontrado' });
    } else {
      logger.error('error al eliminar un producto:', err);
      next(err)
    }
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const { pid } = req.params;
    const updatedProduct = await productService.updateExistingProduct(pid, req.body);
    res.status(200).json(updatedProduct);
  } catch (err) {
    if (err instanceof CustomError && err.code === EErrors.PRODUCT_NOT_FOUND) {
      res.status(404).json({ error: 'Producto no encontrado' });
    } else {
      logger.error('error al actualizar un producto:', err);
      next(err)
    }
  }
};
