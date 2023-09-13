export default class CartService {
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
    const productIndex = cart.products.findIndex(item => item.products.toString() === pid);
    if (productIndex !== -1) {
      cart.products[productIndex].quantity += quantity;
    } else {
      cart.products.push({ products: pid, quantity });
    }
    return await this.dao.addProductToExistingCart(cart);
  }

  deleteProductFromExistingCart = async (cart, pid) => {
    cart.products = cart.products.filter(item => item.products.toString() !== pid);
    return await this.dao.deleteProductFromExistingCart(cart);
  }

  updateExistingCart = async (cart, products) => {
    cart.products = products;
    return await this.dao.updateExistingCart(cart);
  }

  removeAllProducts = async (cart) => {
    cart.products = [];
    return await this.dao.removeAllProducts(cart);
  }
}
