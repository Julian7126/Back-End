import express from 'express';
import * as productsController from "../controller/productsController.js";
// import { isAdmin } from '../middleware/validaciones.js';
import passport from 'passport';

const productosRouter = express.Router();

productosRouter.post("/", passport.authenticate("jwt"), productsController.createProduct);


///acordarse de volver a meter el middleware para las validaciones de admin o premium
productosRouter.delete("/:pid", productsController.deleteProduct)
productosRouter.put("/:pid", productsController.updateProduct);

export default productosRouter;

// isAdmin