import express from 'express';
import * as productsController from "../controller/productsController.js";

const productosRouter = express.Router();

productosRouter.post("/", productsController.createProduct);
productosRouter.delete("/:pid", productsController.deleteProduct)
productosRouter.put("/:pid", productsController.updateProduct);

export default productosRouter;
