import { productService } from "../services/index.js";
import CustomError from '../services/error/custom_error.js';
import EErrors from '../services/error/enums.js';

export const createProduct = async (request, response) => {
  try {
    const newProduct = await productService.createNewProduct(request.body);
    response.status(201).json(newProduct);
  } catch (err) {
    if (err instanceof CustomError && err.code === EErrors.INVALID_PRODUCT) {
      response.status(400).json({ error: 'Producto inválido' });
    } else {
      response.status(500).json({ error: 'Error al crear el producto' });
    }
  }
};

export const deleteProduct = async (request, response) => {
  try {
    const { pid } = request.params;
    await productService.deleteExistingProduct(pid);
    response.status(200).json({ message: 'Producto eliminado con éxito' });
  } catch (err) {
    if (err instanceof CustomError && err.code === EErrors.PRODUCT_NOT_FOUND) {
      response.status(404).json({ error: 'Producto no encontrado' });
    } else {
      response.status(500).json({ error: 'Error al eliminar el producto' });
    }
  }
};

export const updateProduct = async (request, response) => {
  try {
    const { pid } = request.params;
    const updatedProduct = await productService.updateExistingProduct(pid, request.body);
    response.status(200).json(updatedProduct);
  } catch (err) {
    if (err instanceof CustomError && err.code === EErrors.PRODUCT_NOT_FOUND) {
      response.status(404).json({ error: 'Producto no encontrado' });
    } else {
      response.status(500).json({ error: 'Error al actualizar el producto' });
    }
  }
};
