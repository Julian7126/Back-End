import TicketModel from "./models/ticket.models.js"

export default class Ticket {
    async find() {
      return await TicketModel.find().populate("carts").exec();
    }
  
    async findOne(query) {
      return await TicketModel.findOne(query).populate("carts").exec();
    }
  
    async create(ticket) {
      return await TicketModel.create(ticket);
    }
  
    async updateOne(query, ticket) {
      return await TicketModel.updateOne(query, { $set: ticket });
    }
  }
  