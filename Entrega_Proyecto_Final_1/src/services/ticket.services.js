import TicketModel from "../DAO/mongo/ticket.mongo.js";
import { cartService } from './index.js'; 

export default class TicketService {
  constructor(dao) {
    this.dao = dao;
  }
  
  getTicket = async () => {
    return await TicketModel.find(user);
  };

  getTicketById = async (id) => {
    return await TicketModel.findOne({ _id: id });
  };



  createTicket = async (user, cartId) => {
  
    const amount = 100;
  
    const ticket = {
      code: null,
      purchase_datetime: new Date(),
      amount: amount,
      purchaser: user ? user.email : 'email@example.com', 
      cartId: cartId,
      user: user ? user._id : null, 
    };
  
    return await TicketModel.create(ticket);
  };
  
  // createTicket = async (user, cartId) => {
  //   if (!cartId || !user) {
  //     throw new Error("Información del carrito o del usuario faltante");
  //   }
    
  //   const cartDetails = await cartService.getCartDetails(cartId);

  //   let amount = 0;
  //   for (const item of cartDetails.items) {
  //     amount += item.price * item.quantity;
  //   }

    
  //   const ticket = {
  //     code: null, 
  //     purchase_datetime: new Date(),
  //     amount: amount,
  //     purchaser: user.email,
  //     cartId: cartId,
  //     user: user._id,
     
  //   };

  //   return await TicketModel.create(ticket);
  // };

  updateTicket = async (id, ticketData) => {
    return await TicketModel.updateOne({ _id: id }, { $set: ticketData });
  };

  getTicketByCartId = async (cartId) => {
    return await TicketModel.findOne({ cartId });
  };

  updateTicketStatus = async (ticketId, status) => {
    return await TicketModel.updateOne({ _id: ticketId }, { $set: { status } });
  };
}
