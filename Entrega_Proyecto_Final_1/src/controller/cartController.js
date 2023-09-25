import { cartService } from "../services/index.js";

export const createCart = async (req, res) => {
  try {
    const newCart = await cartService.createNewCart();
    res.status(201).json(newCart);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear el carrito' });
  }
};

export const addProductToCart = async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;

  try {
    const cart = await cartService.findCartById(cid);
    if (!cart) {
      return res.status(404).json({ error: 'Carrito no encontrado' });
    }

    const updatedCart = await cartService.addProductToExistingCart(cart, pid, quantity);
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json({ error: 'Error al añadir producto al carrito' });
  }
};


export const deleteProductFromCart = async (req, res) => {
  const { cid, pid } = req.params;

  try {
    const cart = await cartService.findCartById(cid);
    if (!cart) {
      return res.status(404).json({ error: 'Carrito no encontrado' });
    }

    const updatedCart = await cartService.deleteProductFromExistingCart(cart, pid);
    res.status(200).json({ message: 'Producto eliminado del carrito', updatedCart });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar producto del carrito' });
  }
};

export const updateCart = async (req, res) => {
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
    res.status(500).json({ error: 'Error al actualizar el carrito' });
  }
};

export const removeAllProductsFromCart = async (req, res) => {
  const { cid } = req.params;

  try {
    const cart = await cartService.findCartById(cid);
    if (!cart) {
      return res.status(404).json({ error: 'Carrito no encontrado' });
    }

    const updatedCart = await cartService.removeAllProducts(cart);
    res.status(200).json({ message: 'Todos los productos han sido eliminados', updatedCart });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar productos del carrito' });
  }
};

export const getCartDetails = async (req, res) => {
  const { cid } = req.params;
  try {
    const details = await cartService.getCartDetails(cid);
    if (!details) {
      return res.status(404).json({ error: 'Detalles del carrito no encontrados' });
    }
    res.status(200).json(details);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener los detalles del carrito' });
  }
};

export const finalizePurchase = async (req, res) => {
  const { cid } = req.params;
  
  // Validamos que el ticket esté en estado "abierto"
  const ticket = await ticketService.getTicketByCartId(cid);
  if (!ticket || ticket.status !== 'abierto') {
    res.status(400).json({ error: 'Ticket inválido o ya cerrado.' });
    return;
  }

  try {
    const { updatedCart, failedProducts } = await cartService.finalizeCartPurchase(cid);

    if (failedProducts.length > 0) {
      res.status(400).json({ error: 'No se pudieron comprar algunos productos', failedProducts });
      return;
    }

    // Aquí, en lugar de crear un nuevo ticket, actualizamos el existente.
    await ticketService.updateTicketStatus(ticket._id, 'finalizado');
    res.status(200).json({ message: 'Compra finalizada con éxito', updatedCart });
  } catch (err) {
    res.status(500).json({ error: 'Error al finalizar la compra' });
  }
};
