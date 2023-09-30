import express from 'express';
import * as cartController from "../controller/cartController.js";
import passport from 'passport';
import { isOwner } from '../middleware/validaciones.js';

const cartRouter = express.Router();

cartRouter.post('/', cartController.createCart);
cartRouter.post("/:cid/products/:pid", isOwner, cartController.addProductToCart);
cartRouter.delete("/:cid/products/:pid", cartController.deleteProductFromCart);
cartRouter.put("/:cid", cartController.updateCart);
cartRouter.delete("/:cid/all", cartController.removeAllProductsFromCart);
cartRouter.get("/:cid/details", cartController.getCartDetails);
cartRouter.post('/:cid/purchase', passport.authenticate("jwt"), cartController.finalizePurchase);

export default cartRouter;
