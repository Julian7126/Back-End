


import express from 'express';
import cartsModel from '../dao/models/carts.models.js';

const cartRouter = express.Router();

cartRouter.post('/', async (request, response) => {
  const result = await cartsModel.create({ products: [] });
  response.send(result);
});

// Agregar un producto al carrito
cartRouter.post("/:cid/product/:pid", async (request, response) => {
  try {
    const cid = +request.params.cid;
    const pid = request.params.pid;
    const { quantity } = request.body;

    const cart = await cartsModel.findById(cid);

    if (!cart) {
      return response.status(404).json({ error: "Carrito not found" });
    }

    cart.products.push({ products: pid, quantity });
    const result = await cart.save();

    response.send(result);
  } catch (error) {
    response.status(404).json({ error: "Error al agregar el producto al carrito" });
  }
});

//eliminar 
cartRouter.delete("/:cid/products/:pid", async (request, response) => {
  try {
    const cid = +request.params.cid;
    const pid = request.params.pid;

    const cart = await cartsModel.findById(cid);

    if (!cart) {
      return response.status(404).json({ error: "Carrito not found" });
    }

    cart.products = cart.products.filter((item) => item.products.toString() !== pid);
    await cart.save();

    response.json({ message: "se elimino" });
  } catch (error) {
    response.status(404).json({ error: "error al eliminar carrito" });
  }
});

//actualizar
cartRouter.put("/:cid", async (request, response) => {
  try {
    const cid = +request.params.cid;
    const { products } = request.body;

    const cart = await cartsModel.findById(cid);

    if (!cart) {
      return response.status(404).json({ error: "Carrito not found" });
    }

    cart.products = products;
    await cart.save();

    response.json({ message: "Carrito actualizado exitosamente" });
  } catch (error) {
    response.status(404).json({ error: "Error al actualizar el carrito" });
  }
});

// Actualizar la cantidad de ejemplares de un producto en el carrito
cartRouter.put("/:cid/product/:pid", async (request, response) => {
  try {
    const cid = +request.params.cid;
    const pid = request.params.pid;
    const { quantity } = request.body;

    const cart = await cartsModel.findById(cid);

    if (!cart) {
      return response.status(404).json({ error: "Carrito not found" });
    }

    const productIndex = cart.products.findIndex(item => item.products.toString() === pid);
    if (productIndex !== -1) {
      cart.products[productIndex].quantity = quantity;
      await cart.save();
    }

    response.json({ message: "ejemplares actualizados" });
  } catch (error) {
    response.status(404).json({ error: "Error" });
  }
});

// delete de carrito entero - puse all porque me generaba problemas con el delete de productos 
cartRouter.delete("/:cid/all", async (request, response) => {
  try {
    const cid = +request.params.cid;

    const cart = await cartsModel.findById(cid);

    if (!cart) {
      return response.status(404).json({ error: "Carrito not found" });
    }

    cart.products = [];
    await cart.save();

    response.json({ message: "Todos los productos del carrito han sido eliminados" });
  } catch (error) {
    response.status(404).json({ error: "Error al eliminar todos los productos del carrito" });
  }
});

export default cartRouter;
