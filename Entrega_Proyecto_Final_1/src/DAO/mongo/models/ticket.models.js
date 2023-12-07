import mongoose from 'mongoose';

const productsSchema = new mongoose.Schema({
  products: { type: mongoose.Schema.Types.ObjectId, ref: "products", required: true },
  quantity: { type: Number, required: true }
});

const TicketSchema = new mongoose.Schema({
  amount: {
    type: Number,
    default: "No se establecio el precio"
  },
  purchaser: { 
    type: String,
    required: true,
  },
  products: [productsSchema],
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