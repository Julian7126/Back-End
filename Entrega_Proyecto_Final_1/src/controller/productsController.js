import { productService } from "../services/index.js";

export const createProduct = async (request, response) => {
  try {
    const newProduct = await productService.createNewProduct(request.body);
    response.status(201).json(newProduct);
  } catch (err) {
    response.status(500).json({ error: 'Error al crear el producto' });
  }
};

export const deleteProduct = async (request, response) => {
  try {
    const { id } = request.params;
    await productService.deleteExistingProduct(id);
    response.status(200).json({ message: 'Producto eliminado con éxito' });
  } catch (err) {
    response.status(500).json({ error: 'Error al eliminar el producto' });
  }
};
