import TicketModel from "./models/ticket.models.js"

export default class Order {
    getOrders = async () => { return await TicketModel.find() }
    getOrderById = async (id) => { return await TicketModel.findOne({ _id: id }) }
    createOrder = async (order) => { return await TicketModel.create(order) }
    updateOrder = async (id, order) => {
        return await TicketModel.updateOne({ _id: id }, { $set: order })
    }
}