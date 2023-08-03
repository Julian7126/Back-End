import express from 'express';
import productsModel from "../dao/models/products.models.js"

const productosRouter = express.Router();


// // todos productos
productosRouter.get("/", async (request , response) => {
  const products = await productsModel.find().lean().exec() 
   response.render(`home`, {products})
});

//id
productosRouter.get("/:pid", async (request, response) => {
  const id = request.params.id
  const products = await productsModel.findById(id)

  response.render('one', products)
});

// // Agrege un nuevo producto
productosRouter.post("/", async (request, response) => {
  const ProductNew = request.body;
  console.log({ ProductNew });

  const productGenerated = await productsModel.create(ProductNew);

  console.log({ productGenerated });

  response.redirect('/api/productos/'); 
});


// // Eliminar un producto
productosRouter.delete("/:pid", async (request,response) => {
  const pid = request.params.pid;
  const result = await productsModel.deleteOne({ _id: pid });

  if (result.deletedCount === 0) {
    return response.status(404).json({ error: "Producto no encontrado" });
  }
  response.redirect('/api/productos')
  
});

export default productosRouter;




























