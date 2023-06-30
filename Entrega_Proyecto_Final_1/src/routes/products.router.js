import express from "express";
import ProductManager from "../services/productManager.js";


const productosRouter = express.Router();
const manager = new ProductManager("productos.json");


productosRouter.get("/", (request , response) => { //obetener todos 
  try {
    const limit = request.query.limit;
    const productos = manager.obtenerProductos();

    if (limit) {
      const limiteProductos = productos.slice(0, parseInt(limit));
      response.json(limiteProductos);
    } else {
      response.json(productos);
    }
  } catch (e) {
    response.status(404).json({ e: "Fallamo loco" });
  }
});


productosRouter.get("/:pid", (request, response) => { //obetener /id
  try {
    const pid = request.params.pid;
    const productos = manager.obtenerProductos();
    const producto = productos.find((p) => p.id.toString() === pid);

    if (producto) {
      response.json(producto);
    } else {
      response.status(404).json({ error: "fallamo loco" });
    }
  } catch (e) {
    response.status(404).json({ e: "fallamo en encontrar el producto" });
  }
});


productosRouter.post("/", (request, response) => { // Agregar 
  try {
    const { id, title, description, price, thumbnails, code, stock } = request.body;
//tengo un problemita con esto 
    // if (!id || !title || !description || !price || !thumbnails || !code || !stock) {
    //   response.status(404).json({ error: "fallamo faltan campos" });
    //   return;
    // }

    const nuevoProducto = manager.crearProducto({id, title, description, price, thumbnails, code, stock});
    manager.agregarProducto(nuevoProducto);
    response.status(201).json(nuevoProducto);
  } catch (e) {
    response.status(404).json({ e: "fallamo en agregar el celu" });
  }
});


productosRouter.put("/:pid", (request, response) => {  // Actualizar
  try {
    const pid = request.params.pid;
    const updatedFields = request.body;

    manager.actualizarProducto(pid, updatedFields);
    response.json({ message: "celu actualizado" });
  } catch (e) {
    response.status(404).json({ e: "fallamo en actualizar el celu" });
  }
});


productosRouter.delete("/:pid", (request,response) => { //eliminar
  try {
    const pid = request.params.pid;

    manager.eliminarProducto(pid);
    response.json({ message: "celu eliminado" });
  } catch (e) {
    response.status(404).json({ e: "fallamo en eliminar el celu" });
  }
});

export default productosRouter






