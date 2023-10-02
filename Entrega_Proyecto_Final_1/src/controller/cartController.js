import { cartService } from '../services/index.js';


export const createCart = async (req, res, next) => {
  try {
    const newCart = await cartService.createNewCart();
    res.status(201).json(newCart);
  } catch (err) {
    next(err)
  }
};
export const addProductToCart = async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;

  try {
    const cart = await cartService.findCartById(cid);
    const updatedCart = await cartService.addProductToExistingCart(cart, pid, quantity);
    res.status(200).json(updatedCart);
  } catch (err) {
    if (err instanceof CustomError) {
      if (err.code === EErrors.CART_NOT_FOUND || err.code === EErrors.PRODUCT_NOT_FOUND) {
        return res.status(404).json({ error: 'Carrito o producto no encontrado' });
      }
    }
    next(err)
  }
};


export const deleteProductFromCart = async (req, res, next) => {
  const { cid, pid } = req.params;

  try {
    const cart = await cartService.findCartById(cid);
    if (!cart) {
      return res.status(404).json({ error: 'Carrito no encontrado' });
    }

    const updatedCart = await cartService.deleteProductFromExistingCart(cart, pid);
    res.status(200).json({ message: 'Producto eliminado del carrito', updatedCart });
  } catch (err) {
    next(err)
  }
};

export const updateCart = async (req, res, next) => {
  const { cid } = req.params;
  const { products } = req.body;

  try {
    const cart = await cartService.findCartById(cid);
    if (!cart) {
      return res.status(404).json({ error: 'Carrito no encontrado' });
    }

    const updatedCart = await cartService.updateExistingCart(cart, products);
    res.status(200).json(updatedCart);
  } catch (err) {
   next(err)
  }
};

export const removeAllProductsFromCart = async (req, res, next) => {
  const { cid } = req.params;

  try {
    const cart = await cartService.findCartById(cid);
    if (!cart) {
      return res.status(404).json({ error: 'Carrito no encontrado' });
    }

    const updatedCart = await cartService.removeAllProducts(cart);
    res.status(200).json({ message: 'Todos los productos han sido eliminados', updatedCart });
  } catch (err) {
    next(err)
  }
};

export const getCartDetails = async (req, res, next) => {
  const { cid } = req.params;
  try {
    const details = await cartService.getCartDetails(cid);
    if (!details) {
      return res.status(404).json({ error: 'Detalles del carrito no encontrados' });
    }
    res.status(200).json(details);
  } catch (err) {
    next(err)
  }
};




export const finalizePurchase = async (req, res, next) => {
  const { cid } = req.params;
  const user = req.user;

  try {
    const { updatedCart, failedProducts, newTicket } = await cartService.finalizeCartPurchase(user, cid);
   
    
    res.status(200).json({
      message: 'Compra procesada',
      failedProducts,
      cart: updatedCart.products,
      ticket: newTicket,
    });
  } catch (err) {
    if (err instanceof CustomError && err.code === EErrors.CART_FINALIZATION_FAILED) {
      return res.status(400).json({ error: 'Error al finalizar la compra' });
    }
    next(err)
  }
};
