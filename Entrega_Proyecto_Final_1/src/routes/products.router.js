import express from 'express';
import * as productsController from "../controller/productsController.js";

const productosRouter = express.Router();

productosRouter.post("/", productsController.createProduct);
productosRouter.delete("/:pid", productsController.deleteProduct);

export default productosRouter;
