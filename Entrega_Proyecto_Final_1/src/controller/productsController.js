import * as productService from '../services/products.services.js';

export const createProduct = async (req, res) => {
  try {
    const newProduct = await productService.createNewProduct(req.body);
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear el producto' });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await productService.deleteExistingProduct(id);
    res.status(200).json({ message: 'Producto eliminado con éxito' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
};