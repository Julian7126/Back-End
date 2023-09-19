import mongoose from "mongoose";

const TicketSchema = new mongoose.Schema({
    number: Number,
    cartId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'carts'
    },
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'users'
    },
    status: String,
    totalPrice: Number
})

const TicketModel = mongoose.model('tickets', TicketSchema)

export default TicketModel