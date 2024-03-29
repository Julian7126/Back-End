import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productsCollection = `products`;

const productsSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  thumbnail: Buffer,
  code: Number,
  stock: Number,
  owner: {
    type: String,
    },
  },
);

productsSchema.plugin(mongoosePaginate);

mongoose.set(`strictQuery`, false);

const productsModel = mongoose.model(productsCollection, productsSchema);

export default productsModel;
