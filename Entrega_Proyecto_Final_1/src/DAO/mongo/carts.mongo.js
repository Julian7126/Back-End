import cartsModel from './models/carts.models.js';

export default class CartsMongo {

   async getCarts(query = {}) {
    return await cartsModel.find(query);
  }

 
  async getCartById(cid) {
    return await cartsModel.findById(cid).populate('products');
  }
  
   async createNewCart() {
    return await cartsModel.create({ products: [] });
  }

  
  async updateCart(cid, cart) {
    return await cartsModel.findOneAndUpdate({ _id: cid }, { $set: cart }, { new: true });
  }
}
