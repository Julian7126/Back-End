import express from 'express';
import CartManager from '../services/cartManager.js';

const cartRouter = express.Router();
const manager = new CartManager("carrito.json");

cartRouter.post("/", (request, response) => {
  try {
    const cart = {
      id: manager.getNextCartId(),
      products: []
    };

    manager.agregarCarrito(cart);
    response.status(201).json(cart);
  } catch (e) {
    response.status(404).json({ e: "pifiamos y no lo creamos" });
  }
});

cartRouter.get("/:cid", (request, response) => {
  try {
    const cid = +request.params.cid;
    const cart = manager.obtenerCarrito(cid);

    if (cart) {
      response.json(cart.products);
    } else {
      response.status(404).json({ e: "no encontró carrito" });
    }
  } catch (e) {
    response.status(404).json({ e: "error al obtener carrito" });
  }
});

cartRouter.post("/:cid/product/:pid", (request, response) => {
  try {
    const cid = +request.params.cid;
    const pid = request.params.pid;
    const quantity = 1;

    const cart = manager.obtenerCarrito(cid);
    if (!cart) {
      response.status(404).json({ e: "carrito no encontrado" });
      return;
    }

    const existingProduct = cart.products.find((p) => p.product === pid);
    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.products.push({ product: pid, quantity: quantity });
    }

    manager.actualizarCarrito(cid, cart);

    response.json(cart);
  } catch (e) {
    response.status(404).json({ e: "error al agregar un producto al carrito" });
  }
});

export default cartRouter;
