import express from 'express';
import productsModel from "../dao/models/products.models.js"
import cartsModel from "../dao/models/carts.models.js"
import messagesModel from "../dao/models/messages.model.js"
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
  
  const ProductNew = request.body
  console.log({ ProductNew })
  
  const productGenerated = new productsModel(ProductNew)
  await productGenerated.save()
  
  console.log({ productGenerated });

  response.redirect('/api/productos/' ) // aca se puede agregar que redireccione a donde uno quiere ejemplo res.redirect('/ap/productos/' + ProductGenerated.id)
  
});

// // Eliminar un producto
productosRouter.delete("/:pid", async (request,response) => {
  const id = request.params.id
  
  await productsModel.deleteOne({ _id: id })
  response.redirect('/api/productos')
  
});

export default productosRouter;































// import express from 'express';
// import ProductManager from '../dao/services/productManager.js';

// const productosRouter = express.Router();
// const manager = new ProductManager("productos.json");


// // todos productos
// productosRouter.get("/", (request , response) => {
//   try {
//     const limit = request.query.limit;
//     const productos = manager.obtenerProductos();

//     if (limit) {
//       const limiteProductos = productos.slice(0, parseInt(limit));
//       response.json(limiteProductos);
//     } else {
//       response.json(productos);
//     }
//   } catch (e) {
//     response.status(404).json({ e: "Falló al obtener los productos" });
//   }
// });

// // id
// productosRouter.get("/:pid", (request, response) => {
//   try {
//     const pid = request.params.pid;
//     const productos = manager.obtenerProductos();
//     const producto = productos.find((p) => p.id.toString() === pid);

//     if (producto) {
//       response.json(producto);
//     } else {
//       response.status(404).json({ error: "Producto no encontrado" });
//     }
//   } catch (e) {
//     response.status(404).json({ e: "Falló al encontrar el producto" });
//   }
// });

// // Agre un nuevo producto
// productosRouter.post("/", (request, response) => {
//   try {
//     const { id, title, description, price, thumbnails, code, stock } = request.body;

//     const nuevoProducto = manager.crearProducto({ id, title, description, price, thumbnails, code, stock });
//     manager.agregarProducto(nuevoProducto);

//     //lista a traves de WebSocket
//     const productos = manager.obtenerProductos();
//     io.emit('productosActualizados', productos);

//     response.status(201).json(nuevoProducto);
//   } catch (e) {
//     response.status(404).json({ e: "Error al agregar el celular" });
//   }
// });

// // Actualizar un producto
// productosRouter.put("/:pid", (request, response) => {
//   try {
//     const pid = request.params.pid;
//     const updatedFields = request.body;

//     manager.actualizarProducto(pid, updatedFields);

//     // Enviar lista a través de WebSocket
//     const productos = manager.obtenerProductos();
//     io.emit('productosActualizados', productos);

//     response.json({ message: "Producto actualizado" });
//   } catch (e) {
//     response.status(404).json({ e: "Falló al actualizar el producto" });
//   }
// });

// // Eliminar un producto
// productosRouter.delete("/:pid", (request,response) => {
//   try {
//     const pid = request.params.pid;

//     manager.eliminarProducto(pid);

//     // Enviar lista a través de WebSocket
//     const productos = manager.obtenerProductos();
//     io.emit('productosActualizados', productos);

//     response.json({ message: "Producto eliminado" });
//   } catch (e) {
//     response.status(404).json({ e: "Falló al eliminar el producto" });
//   }
// });


// export default productosRouter;
