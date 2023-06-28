
import fs from 'fs';


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
              console.log(`Se devuelve un array Vacio`);
              return [];
            }
          }
        
          guardarProductos(productos) {
            try {
              fs.writeFileSync(this.path, JSON.stringify(productos));
            } catch (error) {
              console.log(`Error: ${error}`);
            }
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



actualizarProducto(id, productoActualizado) {
    const productos = this.cargarProductos();
    const index = productos.findIndex((p) => p.id === parseInt(id));
    
    if (index !== -1) {
      productos[index] = { id: parseInt(id), ...productoActualizado };
      this.guardarProductos(productos);
      console.log(`Producto Actualizado`);
    } else {
      console.log(`No se encontró ningún producto`);
    }
  }
  

eliminarProducto(id) {
    const productos = this.cargarProductos();
    const index = productos.findIndex((p) => p.id === parseInt(id));
    
    if (index !== -1) {
        productos.splice(index, 1);
        this.guardarProductos(productos);
        console.log(`El producto  ${id} fue borrado`);
    } else {
        console.log(`No se encontró ningún producto`);
    }
}


obtenerProductos() {
    return this.cargarProductos();
}
}

export default ProductManager;

const manager = new ProductManager('productos.json');

// let Apple = manager.crearProducto('Iphone 13', "Nueva tecnología en cuanto a móviles", 950, "IMAGEN", "code", 10);
// manager.agregarProducto(Apple);


// let Samsung = manager.crearProducto("Samsung Galaxy S21", "La competencia del iphone xD", 800, "IMAGEN(url)", "code", 5);
// manager.agregarProducto(Samsung);

// let Lenovo = manager.crearProducto("Lenovo Phab 2 Pro", "Una cagada la verdad", 150, "IMAGEN(url)", "code", 3);
// manager.agregarProducto(Lenovo);

// let Huawei = manager.crearProducto("Huawei P20 Pro", " Lindo para que exista en las manos de otra persona", 250, "IMAGEN(url)", "code", 15);
// manager.agregarProducto(Huawei);

// let BlackBerry = manager.crearProducto("BlackBerry", "Esto sigue existiendo?", 50, "IMAGEN(url)", "code", 2);
// manager.agregarProducto(BlackBerry);

// let Motorola = manager.crearProducto("Motorola G72", "y mira la verdad me copa , sera porque tenia motorola de pendejo", 230, "IMAGEN(url)", "code", 7);
// manager.agregarProducto(Motorola);

// let LG = manager.crearProducto("LG k62", "arranca para no aflojar ", 200, "IMAGEN(url)", "code", 35);
// manager.agregarProducto(LG);
// let Nokia = manager.crearProducto("Nokia 1100", "reliquia ", 20, "IMAGEN(url)", "code", 6);
// manager.agregarProducto(Nokia);
// let Oppo = manager.crearProducto("Oppo v2", "La verdad desconozco pero la encontre en google", 150, "IMAGEN(url)", "code", 20);
// manager.agregarProducto(Oppo);
// let Firulais = manager.crearProducto("Firulais 2021", "Celulares para perros", 75, "IMAGEN(url)", "code", 20);
// manager.agregarProducto(Firulais);




const listaProductos = manager.obtenerProductos();
console.log(listaProductos);





