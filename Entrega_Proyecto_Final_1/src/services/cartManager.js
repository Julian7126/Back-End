import fs from 'fs';

class CartManager {
  constructor(path) {
    this.path = path;
    this.verificarArchivo();
  }
   verificarArchivo() {
     if (!fs.existsSync(this.path)) {
        fs.writeFileSync(this.path, '[]');
      }
    }
  cargarCarritos() {
    try {
      const data = fs.readFileSync(this.path, 'utf8');
      return JSON.parse(data);
    } catch (e) {
      return [];
    }
  }

  guardarCarritos(carritos) {
    try {
      fs.writeFileSync(this.path, JSON.stringify(carritos));
    } catch (e) {
      throw new Error('Error al guardar los carritos');
    }
  }

  obtenerCarrito(cid) {
    const carritos = this.cargarCarritos();
    return carritos.find((c) => c.cid === cid);
  }

  actualizarCarrito(cid, carritoActualizado) {
    const carritos = this.cargarCarritos();
    const index = carritos.findIndex((c) => c.cid === cid);

    if (index !== -1) {
      carritos[index] = carritoActualizado;
      this.guardarCarritos(carritos);
    } else {
      throw new Error('Carrito no encontrado');
    }
  }


  agregarCarrito(cart) {
    const carritos = this.cargarCarritos();
    carritos.push(cart);
    this.guardarCarritos(carritos);
  }

  getNextCartId() {
    const carritos = this.cargarCarritos();
    return carritos.length + 1;
  }
}

const manager = new CartManager('carrito.json');


const listaCarrito = manager.obtenerCarrito();
console.log(listaCarrito);

export default CartManager;
