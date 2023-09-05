import * as viewsService from '../services/views.services.js';

export const getProductos = async (req, res) => {
  const products = await viewsService.getProductos();
  res.render('home', { products });
};

export const getList = async (req, res) => {
    const result = await viewsService.getList(req.query);
    res.render('productosList', { ...result });
  };

export const getProductoById = async (req, res) => {
  const product = await viewsService.getProductoById(req.params.pid);
  if (product) {
    res.render('one', product.toObject());
  } else {
    res.status(404).send(`No se encuentra el producto`);
  }
};

export const getChat = async (req, res) => {
  const messages = await viewsService.getChat();
  res.render('chat', { messages });
};

export const getCarts = async (req, res) => {
  const result = await viewsService.getCarts();
  res.render('carts', { result });
};

export const getCartById = async (req, res) => {
  const cart = await viewsService.getCartById(req.params.cid);
  if (cart) {
    res.render('carts', { cart: cart });
  } else {
    res.status(404).send(`Carrito no encontrado`);
  }
};

export const getLogin = (req, res) => {
  res.render("login", {});
};

export const getRegister = (req, res) => {
  const errorMessage = req.flash('error')[0];
  res.render("register", { errorMessage });
};

export const getProfile = (req, res) => {
  const user = req.session.user;
  res.render("profile", user);
};
