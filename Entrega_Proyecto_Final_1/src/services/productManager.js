import fs from 'fs';

class ProductManager {
  constructor(path) {
    this.path = path;
    this.nextId = 1;
  }

  cargarProductos() {
    try {
      const data = fs.readFileSync(this.path, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      throw new Error('Error al cargar');
    }
  }

  guardarProductos(productos) {
    try {
      fs.writeFileSync(this.path, JSON.stringify(productos));
    } catch (error) {
      throw new Error('Error al guardar');
    }
  }

  crearProducto({ title, description, price, thumbnail, code, stock }) {
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

    const productoRepetido = productos.find((p) => {
      return (
        p.title === producto.title &&
        p.description === producto.description &&
        p.price === producto.price &&
        p.thumbnail === producto.thumbnail &&
        p.code === producto.code &&
        p.stock === producto.stock
      );
    });

    if (productoRepetido) {
      throw new Error(` ${producto.title} ya existe `);
    }

    if (productos.length === 0) {
      producto.id = 1;
    } else {
      const ultimoProductoId = productos[productos.length - 1].id;
      producto.id = ultimoProductoId + 1;
    }

    productos.push(producto);
    this.guardarProductos(productos);
  }

  actualizarProducto(id, productoActualizado) {
    const productos = this.cargarProductos();
    const index = productos.findIndex((p) => p.id === parseInt(id));

    if (index !== -1) {
      productos[index] = { id: parseInt(id), ...productoActualizado };
      this.guardarProductos(productos);
    } else {
      throw new Error('No se encontró ninguno');
    }
  }

  eliminarProducto(id) {
    const productos = this.cargarProductos();
    const index = productos.findIndex((p) => p.id === parseInt(id));

    if (index !== -1) {
      productos.splice(index, 1);
      this.guardarProductos(productos);
    } else {
      throw new Error('No se encontró ninguno');
    }
  }

  obtenerProductos() {
    return this.cargarProductos();
  }
}

export default ProductManager;
