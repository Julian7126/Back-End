


import express from 'express';
import cartsModel from '../dao/models/carts.models.js';

const cartRouter = express.Router();

cartRouter.post('/', async (request, response) => {
  const result = await cartsModel.create({ products: [] });
  response.send(result);
});

// Agregar un producto al carrito
cartRouter.post("/:cid/productos/:pid", async (request, response) => {
  try {
    const cid = request.params.cid;
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
cartRouter.delete("/:cid/productos/:pid", async (request, response) => {
  try {
    const cid = request.params.cid;
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
    const cid = request.params.cid;
    const { products } = request.body;

    const cart = await cartsModel.findById(cid);

    if (!cart) {
      return response.status(404).json({ error: "Carrito not found" });
    }

    cart.products = products;
    await cart.save();

    response.json({ message: "carts actualizado" });
  } catch (error) {
    response.status(404).json({ error: "Error al actualizar el carts" });
  }
});

//actualizar products
cartRouter.put("/:cid/productos/:pid", async (request, response) => {
  try {
    const cid = request.params.cid;
    const pid = request.params.pid;
    const { quantity } = request.body;

    const cart = await cartsModel.findById(cid);

    if (!cart) {
      return response.status(404).json({ error: "carts not found" });
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
    const cid = request.params.cid;

    const cart = await cartsModel.findById(cid);

    if (!cart) {
      return response.status(404).json({ error: "carts not found" });
    }

    cart.products = [];
    await cart.save();

    response.json({ message: "eliminamos todos los productos" });
  } catch (error) {
    response.status(404).json({ error: "Error" });
  }
});

export default cartRouter;
