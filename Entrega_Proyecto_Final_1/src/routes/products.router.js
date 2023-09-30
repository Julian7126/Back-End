import express from 'express';
import * as productsController from "../controller/productsController.js";
import { isAdmin } from '../middleware/validaciones.js';

const productosRouter = express.Router();

productosRouter.post("/", productsController.createProduct);
productosRouter.delete("/:pid", isAdmin, productsController.deleteProduct)
productosRouter.put("/:pid", productsController.updateProduct);

export default productosRouter;
