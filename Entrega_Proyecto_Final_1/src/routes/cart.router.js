import express from 'express';
import * as cartController from "../controller/cartController.js";
import passport from 'passport';
import { isOwner } from '../middleware/validaciones.js';

const cartRouter = express.Router();

cartRouter.post('/', cartController.createCart);
cartRouter.post("/:cid/products/:pid", passport.authenticate("jwt"), isOwner, cartController.addProductToCart);
cartRouter.delete("/products/:pid", passport.authenticate("jwt"), cartController.deleteProductFromCart);
cartRouter.put("/:cid", cartController.updateCart);
cartRouter.delete("/:cid/all", passport.authenticate("jwt"), isOwner, cartController.removeAllProductsFromCart);
cartRouter.get("/:cid/details", cartController.getCartDetails);
cartRouter.post('/:cid/purchase', passport.authenticate("jwt"), cartController.finalizePurchase);

export default cartRouter;
