import cartsModel from './models/carts.models.js';

export default class CartsMongo {

   async getCarts(query = {}) {
    return await cartsModel.find(query);
  }

 
   async getCartById(cid) {
    return await cartsModel.findById(cid);
  }

  
   async createNewCart() {
    return await cartsModel.create({ products: [] });
  }

  
   async updateCart(cid, cart) {
    return await cartsModel.updateOne({ _id: cid }, { $set: cart });
  }
}
