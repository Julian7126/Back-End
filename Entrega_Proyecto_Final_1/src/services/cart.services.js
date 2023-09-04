import cartsModel from '../models/carts.models.js';

export const createNewCart = async () => {
    const newCart = await cartsModel.create({ products: [] });
    return newCart;
  };
  
export const findCartById = async (cid) => {
  return await cartsModel.findById(cid);
};

export const addProductToExistingCart = async (cart, pid, quantity) => {
  const productIndex = cart.products.findIndex(item => item.products.toString() === pid);
  if (productIndex !== -1) {
    cart.products[productIndex].quantity += quantity;
  } else {
    cart.products.push({ products: pid, quantity });
  }
  await cart.save();
  return cart;
};

export const deleteProductFromExistingCart = async (cart, pid) => {
  cart.products = cart.products.filter(item => item.products.toString() !== pid);
  await cart.save();
  return cart;
};

export const updateExistingCart = async (cart, products) => {
  cart.products = products;
  await cart.save();
  return cart;
};

export const removeAllProducts = async (cart) => {
  cart.products = [];
  await cart.save();
  return cart;
};
