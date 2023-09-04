import * as productService from "../services/products.services.js";

export const createProduct = async (request, response) => {
  try {
    const newProduct = request.body;
    const createdProduct = await productService.createNewProduct(newProduct);
    response.status(201).json(createdProduct);
  } catch (error) {
    response.status(500).json({ error: 'Error al crear el producto' });
  }
};

export const deleteProduct = async (request, response) => {
  try {
    const { pid } = request.params;
    await productService.deleteExistingProduct(pid);
    response.status(204).json();
  } catch (error) {
    response.status(500).json({ error: 'Error al eliminar el producto' });
  }
};
