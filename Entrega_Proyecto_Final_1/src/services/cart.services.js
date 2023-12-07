import { productService, ticketService } from "../services/index.js";
import logger from "../middleware/logger/configLogger.js";

export default class CartService {
  constructor(dao) {
    this.dao = dao;
  }

  createNewCart = async () => {
    return await this.dao.createNewCart();
  };

  findCartById = async (cid) => {
    return await this.dao.getCartById(cid);
  };

  addProductToExistingCart = async (cart, pid, quantity) => {
    const productIndex = cart.products.findIndex(
      (item) => item.products.toString() === pid
    );
    if (productIndex !== -1) {
      cart.products[productIndex].quantity += quantity;
    } else {
      cart.products.push({ products: pid, quantity });
    }
    return await this.dao.updateCart(cart._id, cart); 
  };

  deleteProductFromExistingCart = async (cart, pid) => {
    if (cart.products && Array.isArray(cart.products)) {
      cart.products = cart.products.filter(
        (product) => product._id.toString() !== pid
      );
      return await this.dao.updateCart(cart._id, cart);
    } else {
      throw new Error(
        'No se pudo encontrar la propiedad "products" en el carrito o no es un array.'
      );
    }
  };

  updateExistingCart = async (cart, products) => {
    cart.products = products;
    return await this.dao.updateCart(cart._id, cart);
  };

  removeAllProducts = async (cart) => {
    cart.products = [];
    return await this.dao.updateCart(cart._id, cart);
  };

  getCartDetails = async (cartId) => {
    const cart = await this.dao.getCartById(cartId);
    if (!cart) {
      throw new Error("Carrito no encontrado");
    }

    const cartDetails = { items: [] };

    for (const item of cart.products) {
      const productDetails = await productService.findProductById(
        item.products
      );

      cartDetails.items.push({
        productId: item.products,
        quantity: item.quantity,
        price: productDetails.price,
      });
    }

    return cartDetails;
  };

  finalizeCartPurchase = async (user, cartId) => {
    const failedProducts = [];
    let updatedCart;
    let newTicket;

    try {

     logger.info("Actualizando el carrito...");
      updatedCart = await this.dao.getCartById(cartId);
     logger.info("Carrito obtenido:", updatedCart);

      if (
        !updatedCart ||
        !updatedCart.products ||
        updatedCart.products.length === 0
      ) {
        throw new Error(
          "El carrito no fue obtenido correctamente o está vacío."
        );
      }

      for (const item of updatedCart.products) {
        logger.info("Verificando stock para el producto:", item);

        const productId = item.products || item.product;
        const product = await productService.findProductById(productId);
        if (!product) {
          const errorMessage = `Producto con ID ${item.product} no encontrado.`;
          failedProducts.push({
            productSearch: item.product,
            message: errorMessage,
          });
          continue;
        }

       logger.info("Producto encontrado:", product);

        if (product.stock < item.quantity) {
          const errorMessage = `Quieres comprar ${item.quantity} productos y solo tenemos ${product.stock} en stock.`;
          failedProducts.push({
            productSearch: item.product,
            message: errorMessage,
          });
        }
      }

      if (failedProducts.length === 0) {
        
        for (const item of updatedCart.products) {
         logger.info("Procesando producto:", item);

          const productId = item.products || item.product;
          const product = await productService.findProductById(productId);

         logger.info("Producto encontrado:", product);

          
          await productService.updateProductStock(
            productId,
            product.stock - item.quantity
          );
         logger.info("Stock actualizado para el producto:", productId);
        }

        
       logger.info("Creando nuevo ticket...");
        newTicket = await ticketService.createTicket(
          user,
          updatedCart.products
        );
       logger.info("Nuevo ticket creado:", newTicket);

     
      //  logger.info("Vaciando el carrito...");
      //   await this.dao.updateCart(cartId, { user, products: [] });
      //  logger.info("Carrito vaciado.");
      }

      return { failedProducts, newTicket };
    } catch (err) {
      
     logger.info("Error en finalizeCartPurchase:", err);
      throw err;
    }
  };
}
