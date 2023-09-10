import CartDTO from "../DAO/DTO/carts.dto.js";

export default class CartRepository {
  constructor(dao) {
    this.dao = dao;
  }

  createNewCart = async () => {
    return await this.dao.createNewCart();
  }

  findCartById = async (cid) => {
    return await this.dao.findCartById(cid);
  }

  addProductToExistingCart = async (cart, pid, quantity) => {
    const cartToUpdate = new CartDTO(cart);
    return await this.dao.addProductToExistingCart(cartToUpdate, pid, quantity);
  }

  deleteProductFromExistingCart = async (cart, pid) => {
    return await this.dao.deleteProductFromExistingCart(cart, pid);
  }

  updateExistingCart = async (cart, products) => {
    const cartToUpdate = new CartDTO(cart);
    return await this.dao.updateExistingCart(cartToUpdate, products);
  }

  removeAllProducts = async (cart) => {
    return await this.dao.removeAllProducts(cart);
  }
}
