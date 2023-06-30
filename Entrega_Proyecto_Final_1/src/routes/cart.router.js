import express from "express";
import CartManager from "../services/cartManager.js";

const cartRouter = express.Router();
const manager = new CartManager("carrito.json");

cartRouter.get("/:cid", (request, response) => {
  try {
    const cid = request.params.cid;
    const cart = manager.obtenerCarrito(cid);

    if (cart) {
      response.json(cart.products);
    } else {
      response.status(400).json({ error: "celular en carrito no encontrado" });
    }
  } catch (e) {
    response.status(404).json({ error: "Error al obtener el carrito" });
  }
});

cartRouter.post("/:cid/product/:pid", (request, response) => { // de a uno
  try {
    const cid = request.params.cid;
    const pid = request.params.pid;
    const quantity = 1; 
    
    const cart = manager.obtenerCarrito(cid);
    if (!cart) {
      response.status(404).json({ e: "Carrito no encontrado" });
      return;
    }

    const existingProduct = cart.products.find((p) => p.product === pid);
    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.products.push({ product: pid, quantity : quantity });
    }

    manager.actualizarCarrito(cid, cart);

    response.json(cart);
  } catch (e) {
    response.status(404).json({ e: "Error al agregar el producto al carrito" });
  }
});

export default cartRouter;
