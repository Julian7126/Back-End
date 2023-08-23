


import express from 'express';
import cartsModel from '../dao/models/carts.models.js';

const cartRouter = express.Router();

cartRouter.post('/', async (request, response) => {
  const result = await cartsModel.create({ products: [] });
  response.send(result);
});


//nuevo
cartRouter.post("/:cid/products/:pid", async (request, response) => {
  try {
    const cid = request.params.cid;
    const pid = request.params.pid;
    const { quantity } = request.body;

    const cart = await cartsModel.findById(cid);

    if (!cart) {
      return response.status(404).json({ error: "Carrito not found" });
    }

    const productIndex = cart.products.findIndex(item => item.products.toString() === pid);
    if (productIndex !== -1) {
     
      cart.products[productIndex].quantity += quantity;
    } else {
    
      cart.products.push({ products: pid, quantity });
    }

    const result = await cart.save();
    response.redirect("/carts"); 

  } catch (error) {
    response.status(404).json({ error: "Error al agregar" });
  }
});






cartRouter.delete("/:cid/products/:pid", async (request, response) => {
  try {
    const cid = request.params.cid;
    const pid = request.params.pid;

    console.log("CID:", cid);
    console.log("PID:", pid);

    const cart = await cartsModel.findById(cid);

    console.log("Cart:", cart);

    if (!cart) {
      console.log("Cart not found!");
      return response.status(404).json({ error: "Carrito not found" });
    }

    cart.products = cart.products.filter((item) => item.products.toString() !== pid);

    console.log("Updated Cart:", cart);

    await cart.save();

    console.log("Cart saved successfully!");

    response.json({ message: "se elimino" });
  } catch (error) {
    console.error("Error al eliminar carrito:", error);
    response.status(404).json({ error: "error al eliminar carrito" });
  }
});



cartRouter.put("/:cid", async (request, response) => {
  try {
    const cid = request.params.cid;
    const { products } = request.body;

    console.log("CID:", cid);
    console.log("New Products:", products);

    const cart = await cartsModel.findById(cid);

    console.log("Cart:", cart);

    if (!cart) {
      console.log("Cart not found!");
      return response.status(404).json({ error: "Carrito not found" });
    }

    cart.products = products;

    console.log("Updated Cart:", cart);

    await cart.save();

    console.log("Cart saved successfully!");

    response.json({ message: "carts actualizado" });
  } catch (error) {
    console.error("Error al actualizar el carts:", error);
    response.status(404).json({ error: "Error al actualizar el carts" });
  }
});



cartRouter.put("/:cid/products/:pid", async (request, response) => {
  try {
    const cid = request.params.cid;
    const pid = request.params.pid;
    const { quantity } = request.body;

    console.log("CID:", cid);
    console.log("PID:", pid);
    console.log("Quantity:", quantity);

    const cart = await cartsModel.findById(cid);

    console.log("Cart:", cart);

    if (!cart) {
      console.log("Cart not found!");
      return response.status(404).json({ error: "carts not found" });
    }

    const productIndex = cart.products.findIndex(item => item.products.toString() === pid);

    console.log("Product Index:", productIndex);

    if (productIndex !== -1) {
      console.log("Updating quantity for existing product.");
      cart.products[productIndex].quantity = quantity;
      await cart.save();
    } else {
      console.log("Product not found in the cart.");
    }

    response.json({ message: "ejemplares actualizados" });
  } catch (error) {
    console.error("Error al actualizar:", error);
    response.status(404).json({ error: "Error" });
  }
});

cartRouter.delete("/:cid/all", async (request, response) => {
  try {
    const cid = request.params.cid;

    console.log("CID:", cid);

    const cart = await cartsModel.findById(cid);

    console.log("Cart:", cart);

    if (!cart) {
      console.log("Cart not found!");
      return response.status(404).json({ error: "carts not found" });
    }

    cart.products = [];
    await cart.save();

    console.log("Cart saved successfully!");

    response.json({ message: "eliminamos todos los productos" });
  } catch (error) {
    console.error("Error al eliminar:", error);
    response.status(404).json({ error: "Error" });
  }
});


export default cartRouter;
