
import express from 'express';
import cartsModel from '../dao/models/carts.models.js';

const cartRouter = express.Router();

// const manager = new CartManager("carrito.json");

// 
cartRouter.get("/", async (request, response) => {
  try {
    const result = await cartsModel.find()
    response.send(result)
  } catch (e) {
    response.status(404).json({ e: "pifiamos y no lo creamos" });
  }
});

cartRouter.get("/:cid", async (request, response) => {
  try {
    const cid = +request.params.cid;
    const cart = await cartsModel.findById(cid);

    if (!cart) {
      return response.status(404).json({ error: "Carrito not found" });
    }

    response.send(cart);
  } catch (e) {
    response.status(404).json({ error: "Error " });
  }
});

cartRouter.post('/', async (request, response) => {
  const result = await cartsModel.create({products: []})
  response.send(result)
});



// agrega producto al carrito
cartRouter.post("/:cid/product/:pid", async (request, response) => {
  try {
    const cid = +request.params.cid;
    const pid = request.params.pid;
    const { quantity } = request.body; //body

    const cart = await cartsModel.findById(cid);

    if (!cart) {
      return response.status(404).json({ error: "Carrito not found" });
    }

    cart.products.push({ id: pid, quantity });
    const result = await cart.save();

    response.send(result);
  } catch (error) {
    response.status(404).json({ error: "Error" });
  }
});




export default cartRouter;



