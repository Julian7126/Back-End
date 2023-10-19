import mongoose from 'mongoose';

const TicketSchema = new mongoose.Schema({
  _id: {
    type: mongoose.SchemaTypes.ObjectId,
    default: new mongoose.Types.ObjectId(),
  },
  amount: {
    type: Number,
    default: "No se establecio el precio"
  },
  purchaser: { 
    type: String,
    required: true,
  },
  cartId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'carts',
  },
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'users',
  },
  status: {
    type: String,
    default: "abierto" 
  },
  code :{
    type: String,
  },
});

const TicketModel = mongoose.model('tickets', TicketSchema);

export default TicketModel;
