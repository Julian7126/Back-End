import express from 'express';
import * as productsController from "../controller/productsController.js";
import { isAdminPremium } from '../middleware/validaciones.js';
import passport from 'passport';

const productosRouter = express.Router();

productosRouter.post("/", productsController.createProduct);
productosRouter.delete("/:pid", isAdminPremium ,productsController.deleteProduct)
productosRouter.put("/:pid", productsController.updateProduct);

export default productosRouter;



// passport.authenticate("jwt")