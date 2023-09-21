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
    if (!cartId || !user) {
      throw new Error("Información del carrito o del usuario faltante");
    }
    
    // Obtener detalles del carrito para calcular el monto total
    const cartDetails = await cartService.getCartDetails(cartId);

    // Calcular el monto total del carrito
    let amount = 0;
    for (const item of cartDetails.items) {
      amount += item.price * item.quantity;
    }

    // Crear el objeto ticket
    const ticket = {
      code: null,  // Este campo debería generarse automáticamente según tu modelo de Mongoose
      purchase_datetime: new Date(),
      amount: amount,
      purchaser: user.email,
      cartId: cartId,
      user: user._id,
      // Otros campos como status, etc.
    };

    return await TicketModel.create(ticket);
  };

  updateTicket = async (id, ticketData) => {
    return await TicketModel.updateOne({ _id: id }, { $set: ticketData });
  };

  // Puedes agregar otros métodos según tus necesidades
}
