
import { productService } from "../services/index.js";

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
    cart.products = cart.products.filter(item => item.products.toString() !== pid);
    return await this.dao.updateCart(cart._id, cart);
  }

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
  

  finalizeCartPurchase = async (user , cartId) => {
    const cart = await this.dao.getCartById(cartId);
    
    if (!cart) {
      throw new Error('Carrito no encontrado');
    }
    
    const failedProducts = [];
    
    for (const item of cart.products) {
      const product = await productService.findProductById(item.products);
      if (product.stock < item.quantity) {
        failedProducts.push(item.products);
        continue;
      }
    }
    
    if (failedProducts.length > 0) {
      cart.products = cart.products.filter(item => !failedProducts.includes(item.products));
      await this.dao.updateCart(cart._id, cart);
    } else {
      cart.status = 'cerrado';
    }
  
    return { updatedCart: cart, failedProducts };
  }
}


