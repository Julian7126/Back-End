import mongoose from "mongoose";

const cartsCollection = `carts`;

const productsSchema = new mongoose.Schema({
    products: { type: mongoose.Schema.Types.ObjectId, ref: "products", required: true },
    quantity: { type: Number, required: true }
});

const cartsSchema = new mongoose.Schema({
    products: [productsSchema],
    status: {
        type: String,
        enum: ['abierto', 'cerrado'],
        default: 'abierto'
      }
});

mongoose.set('strictQuery', false);

const cartsModel = mongoose.model(cartsCollection, cartsSchema);

export default cartsModel;
