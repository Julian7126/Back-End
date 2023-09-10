import express from 'express';
import * as cartController from "../controller/cartController.js";

const cartRouter = express.Router();

cartRouter.post('/', cartController.createCart);
cartRouter.post("/:cid/products/:pid", cartController.addProductToCart);
cartRouter.delete("/:cid/products/:pid", cartController.deleteProductFromCart);
cartRouter.put("/:cid", cartController.updateCart);
cartRouter.delete("/:cid/all", cartController.removeAllProductsFromCart);

export default cartRouter;
