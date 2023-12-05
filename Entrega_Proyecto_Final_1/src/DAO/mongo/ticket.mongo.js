import TicketModel from "./models/ticket.models.js"

export default class Ticket {
    async find() {
      return await TicketModel.find();
    }
  
    async findOne(query) {
      return await TicketModel.findOne(query);
    }
  
    async create(ticket) {
      return await TicketModel.create(ticket);
    }
  
    async updateOne(query, ticket) {
      return await TicketModel.updateOne(query, { $set: ticket });
    }

    async ticketPopulate(ticketId) {
      return await TicketModel
        .findById(ticketId)
        .populate('products')
        .exec();
    }


  }
  