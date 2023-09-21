import TicketModel from "./models/ticket.models.js"

export default class Ticket {
    getTicket = async () => { return await TicketModel.find() }
    getTicketById = async (id) => { return await TicketModel.findOne({ _id: id }) }
    createTicket= async (ticket) => { return await TicketModel.create(ticket) }
    updateTicket = async (id, ticket) => {
        return await TicketModel.updateOne({ _id: id }, { $set: ticket })
    }
}