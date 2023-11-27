
import { productService, ticketService } from "../services/index.js";

export default class CartService {
  constructor(dao) {
    this.dao = dao;
  }

  createNewCart = async () => {
    return await this.dao.createNewCart();
  }

  findCartById = async (cid) => {
    return await this.dao.getCartById(cid);
  }

  addProductToExistingCart = async (cart, pid, quantity) => {
    const productIndex = cart.products.findIndex(item => item.products.toString() === pid);
    if (productIndex !== -1) {
      cart.products[productIndex].quantity += quantity;
    } else {
      cart.products.push({ products: pid, quantity });
    }
    return await this.dao.updateCart(cart._id, cart);
  }


  deleteProductFromExistingCart = async (cart, pid) => {
    if (cart.products && Array.isArray(cart.products)) {
      cart.products = cart.products.filter(product => product._id.toString() !== pid);     
      return await this.dao.updateCart(cart._id, cart);
    } else {
      throw new Error('No se pudo encontrar la propiedad "products" en el carrito o no es un array.');
    }
  };
  

  updateExistingCart = async (cart, products) => {
    cart.products = products;
    return await this.dao.updateCart(cart._id, cart);
  }

  removeAllProducts = async (cart) => {
    cart.products = [];
    return await this.dao.updateCart(cart._id, cart);
  }


  getCartDetails = async (cartId) => {
    const cart = await this.dao.getCartById(cartId);
    if (!cart) {
      throw new Error('Carrito no encontrado');
    }
  
  
    const cartDetails = { items: [] };
  
  
    for (const item of cart.products) {
      // Obtener detalles del producto
      const productDetails = await productService.findProductById(item.products);
  
      cartDetails.items.push({
        productId: item.products,
        quantity: item.quantity,
        price: productDetails.price, 
      });
    }
  
    return cartDetails;
  }
  

finalizeCartPurchase = async (user, cartId) => {
  const cart = await this.dao.getCartById(cartId);

  if (!cart) {
    throw new Error('Carrito no encontrado');
  }

  const failedProducts = [];

  for (const item of cart.products) {
    const product = await productService.findProductById(item.products);
    if (product.stock < item.quantity) {
      const errorMessage = `Quieres comprar ${item.quantity} productos y solo tenemos ${product.stock} en stock.`;
      failedProducts.push({
        productSearch: item.products,
        message: errorMessage
      });
      continue;
     }else {
      await productService.updateProductStock(item.products, product.stock - item.quantity);
      
    }
  }

  let newTicket = null;

  if (failedProducts.length > 0) {
    cart.products = cart.products.filter(item => !failedProducts.map(fp => fp.productSearch).includes(item.products));
    await this.dao.updateCart(cart._id, cart);
  } else {
    cart.status = 'cerrado';
    newTicket = await ticketService.createTicket(user, cartId);
  }

  return { updatedCart: cart, failedProducts, newTicket };
 };
}
