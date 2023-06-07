const fs = require('fs');

class ProductManager {
  constructor(path) {
    this.path = path;
    this.nextId= 1;
  }

  cargarProductos() {
    try {
      const data = fs.readFileSync(this.path, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }
  
  guardarProductos(productos) {
    fs.writeFileSync(this.path, JSON.stringify(productos, null, 2));
  }

  crearProducto(title, description, price, thumbnail, code, stock) {
    const product = {
      id: this.nextId,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    this.nextId++;

    return product;
  }

  agregarProducto(producto) {
    const productos = this.cargarProductos();

    if (productos.length === 0) {
      producto.id = 1;
    } else {
      const ultimoProductoId = productos[productos.length - 1].id;
      producto.id = ultimoProductoId + 1;
    }

    productos.push(producto);
    this.guardarProductos(productos);
  }


  obtenerProductos() {
    return this.cargarProductos();
  }
}


const manager = new ProductManager('productos.json');

let Apple = manager.crearProducto('Iphone 13', "Nueva tecnología en cuanto a móviles", 950, "IMAGEN", "code", 10);
manager.agregarProducto(Apple);


let Samsung = manager.crearProducto("Samsung Galaxy S21", "La competencia del iphone xD", 800, "IMAGEN(url)", "code", 5);
manager.agregarProducto(Samsung);


const listaProductos = manager.obtenerProductos();
console.log(listaProductos);
