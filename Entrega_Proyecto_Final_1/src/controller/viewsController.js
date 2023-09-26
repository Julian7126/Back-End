import * as viewsService from '../services/views.services.js';

export const getProductos = async (req, res) => {
  try {
    const products = await viewsService.getProductos();
    console.log("Productos obtenidos:", products); 
    res.render('home', { products });
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).send("Error al obtener productos");
  }
};

export const getList = async (req, res) => {
  const result = await viewsService.getList(req.query);
  const user = req.session.user;
  res.render('productosList', { ...result, user });
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
  const user = req.session.user;
  res.render('chat', { messages , user });
};

export const getCarts = async (req, res) => {
  const result = await viewsService.getCarts();
  res.render('carts', { result });
};

export const getCartById = async (req, res) => {
  const cart = await viewsService.getCartById(req.params.cid);
  const user = req.session.user;
  if (cart) {

    console.log(cart)
    res.render('carts', { cart: cart.toObject(), user });
  } else {
    res.status(404).send("Carrito no encontrado");
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
  console.log("Usuario de la sesión:", req.session.user); // Añade esto para depurar
  const user = req.session.user;
  res.render("profile", user);
};
