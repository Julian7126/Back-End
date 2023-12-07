import TicketModel from "./models/ticket.models.js"

export default class Ticket {
    async find() {
      return await TicketModel.find();
    }
  
    async findOne(query) {
      return await TicketModel.findOne(query);
    }
  
    async create(ticket) {
      const newTicket = await TicketModel.create(ticket);
      console.log("newTicket", newTicket);
    
      const ticketPopulated = await TicketModel
        .findOne({ _id: newTicket._id })
        .populate('products.products')
        .exec();

      return ticketPopulated;
    }
  
    async updateOne(query, ticket) {
      return await TicketModel.updateOne(query, { $set: ticket });
    }

  


  }
  