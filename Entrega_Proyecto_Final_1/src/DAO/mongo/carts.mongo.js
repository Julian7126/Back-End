import cartsModel from './models/carts.models.js';

export default class CartsMongo {
  static async createNewCart() {
    return await cartsModel.create({ products: [] });
  }

  static async findCartById(cid) {
    return await cartsModel.findById(cid);
  }

  static async addProductToExistingCart(cart) {
    await cart.save();
    return cart;
  }

  static async deleteProductFromExistingCart(cart) {
    await cart.save();
    return cart;
  }

  static async updateExistingCart(cart) {
    await cart.save();
    return cart;
  }

  static async removeAllProducts(cart) {
    await cart.save();
    return cart;
  }
}
