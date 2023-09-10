import cartsModel from './models/carts.models.js';

export default class Carts {
  async createNewCart() {
    return await cartsModel.create({ products: [] });
  }

  async findCartById(cid) {
    return await cartsModel.findById(cid);
  }

  async addProductToExistingCart(cart, pid, quantity) {
    const productIndex = cart.products.findIndex(item => item.products.toString() === pid);
    if (productIndex !== -1) {
      cart.products[productIndex].quantity += quantity;
    } else {
      cart.products.push({ products: pid, quantity });
    }
    await cart.save();
    return cart;
  }

  async deleteProductFromExistingCart(cart, pid) {
    cart.products = cart.products.filter(item => item.products.toString() !== pid);
    await cart.save();
    return cart;
  }

  async updateExistingCart(cart, products) {
    cart.products = products;
    await cart.save();
    return cart;
  }

  async removeAllProducts(cart) {
    cart.products = [];
    await cart.save();
    return cart;
  }
}
