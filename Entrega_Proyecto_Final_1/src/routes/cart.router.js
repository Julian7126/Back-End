
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

cartRouter.post('/', async (require, response) => {
  const result = await cartsModel.create({products: []})
  response.send(result)
});



// agrega producto al carrito
cartRouter.post("/:cid/product/:pid", async (request, response) => {
  try {
    const cid = +request.params.cid;
    const pid = request.params.pid;
    const quantity = require.query.quantity 

    const cart = await cartRouter.findById(cid)
    cart.products.push({ id: pid, quantity })
    const result = cart.save()


    response.send(result)

  } catch (e) {
    response.status(404).json({ e: "error al agregar un producto al carrito" });
  }
});

export default cartRouter;



