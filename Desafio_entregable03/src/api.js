import express from "express";
import ProductManager from "./productManager.js";

const app = express();

const manager = new ProductManager(`src/productos.json`);

app.get(`/products`, (request, response) => {
  const productos = manager.obtenerProductos(); //llamando a mi funcion obtener productos
  // definir el limite

  const limit = request.query.limit;

  if (limit) {
    const limiteProductos = productos.slice(0, parseInt(limit));
    response.json(limiteProductos);
  } else if (productos.length > 0) {
    response.json(productos);
  } else {
    response
      .status(404)
      .json({ error: "me encantaria poner una imagen de un gatito 404" });
  }
});

app.get(`/products/:id`, (request, response) => {
  //tengo problemas aca
  const id = request.params.id;
  const productos = manager.obtenerProductos();
  const producto = productos.find((p) => p.id == id);

  if (producto !== undefined) {
    response.json(producto);
  } else {
    response
      .status(404)
      .json({ error: "me encantaria poner una imagen de un gatito 404 " });
  }
});

app.listen(8080, () => {
  console.log(`activado 8080`);
});
