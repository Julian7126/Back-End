import mongoose from 'mongoose';
import crypto from 'crypto';

const TicketSchema = new mongoose.Schema({
  _id: {
    type: mongoose.SchemaTypes.ObjectId,
    default: new mongoose.Types.ObjectId(),
  },
  code: {
    type: String,
    unique: true,
    default: () => crypto.randomBytes(8).toString('hex'),
  },
  purchase_datetime: {
    type: Date,
    default: Date.now,
  },
  amount: {
    type: Number,
  },
  purchaser: {
    type: String,
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
  },
});

const TicketModel = mongoose.model('tickets', TicketSchema);

export default TicketModel;
