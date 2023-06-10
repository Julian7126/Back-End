
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
      console.log(`Se devuelve un array Vacio`)
      return []
    }
  }
  
  guardarProductos(productos) {
    fs.writeFileSync(this.path, JSON.stringify(productos),(error)=>{
      if(error){
        console.log(`Error: ${error}`)
      }
    });
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

    const productoRepetido = productos.find((p)=>{

      return (
        p.title === producto.title &&
        p.description === producto.description &&
        p.price === producto.price &&
        p.thumbnail === producto.thumbnail &&
        p.code === producto.code &&
        p.stock === producto.stock
      );

    })

    if(productoRepetido){
      console.log(`El producto llamado ${producto.title} ya es existente dentro del archivo`)
      return
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




  actualizarProducto (id, productoActualizado) {
    const productos= this.cargarProductos()
    const index= productos.findIndex((p)=>p,id=== id)
 

    if ( index !== -1){
      productos[index]={id, ...productoActualizado}
      this.guardarProductos(productos);
      
    }else {
    console.log("no tiene id ese p")
  


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
