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
      throw new Error('No se encontro ninguno');
    }
  }

  eliminarProducto(id) {
    const productos = this.cargarProductos();
    const index = productos.findIndex((p) => p.id === parseInt(id));

    if (index !== -1) {
      productos.splice(index, 1);
      this.guardarProductos(productos);
    } else {
      throw new Error('No se encontro ninguno');
    }
  }

  obtenerProductos() {
    return this.cargarProductos();
  }
}

export default ProductManager;

const manager = new ProductManager('productos.json');

let Apple = manager.crearProducto({ title: 'Iphone 13', description: 'Nueva tecnología en cuanto a móviles', price: 950, thumbnail: 'IMAGEN', code: 'code', stock: 10 });
// manager.agregarProducto(Apple);

// let Samsung = manager.crearProducto({ title: 'Samsung Galaxy S21', description: 'La competencia del iphone xD', price: 800, thumbnail: 'IMAGEN(url)', code: 'code', stock: 5 });
// manager.agregarProducto(Samsung);

// let Lenovo = manager.crearProducto({ title: 'Lenovo Phab 2 Pro', description: 'Una cagada la verdad', price: 150, thumbnail: 'IMAGEN(url)', code: 'code', stock: 3 });
// manager.agregarProducto(Lenovo);

// let Huawei = manager.crearProducto({ title: 'Huawei P20 Pro', description: 'Lindo para que exista en las manos de otra persona', price: 250, thumbnail: 'IMAGEN(url)', code: 'code', stock: 15 });
// manager.agregarProducto(Huawei);

// let BlackBerry = manager.crearProducto({ title: 'BlackBerry', description: 'Esto sigue existiendo?', price: 50, thumbnail: 'IMAGEN(url)', code: 'code', stock: 2 });
// manager.agregarProducto(BlackBerry);

// let Motorola = manager.crearProducto({ title: 'Motorola G72', description: 'y mira la verdad me copa , sera porque tenia motorola de pendejo', price: 230, thumbnail: 'IMAGEN(url)', code: 'code', stock: 7 });
// manager.agregarProducto(Motorola);

// let LG = manager.crearProducto({ title: 'LG k62', description: 'arranca para no aflojar', price: 200, thumbnail: 'IMAGEN(url)', code: 'code', stock: 35 });
// manager.agregarProducto(LG);

// let Nokia = manager.crearProducto({ title: 'Nokia 1100', description: 'reliquia', price: 20, thumbnail: 'IMAGEN(url)', code: 'code', stock: 6 });
// manager.agregarProducto(Nokia);

// let Oppo = manager.crearProducto({ title: 'Oppo v2', description: 'La verdad desconozco pero la encontre en google', price: 150, thumbnail: 'IMAGEN(url)', code: 'code', stock: 20 });
// manager.agregarProducto(Oppo);

// let Firulais = manager.crearProducto({ title: 'Firulais 2021', description: 'Celulares para perros', price: 75, thumbnail: 'IMAGEN(url)', code: 'code', stock: 20 });
// manager.agregarProducto(Firulais);

const listaProductos = manager.obtenerProductos();
console.log(listaProductos);
