import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productsCollection = `products`;

const productsSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  thumbnail: String,
  code: Number,
  stock: Number,
  owner: {
    type: String,
    required: true,
    default: "admin",
    validate: {
      validator: function (value) {
        return value.endsWith("@premium.com"); 
      },
      message: "El propietario debe ser un usuario premium.",
    },
  },
});

productsSchema.plugin(mongoosePaginate);

mongoose.set(`strictQuery`, false);

const productsModel = mongoose.model(productsCollection, productsSchema);

export default productsModel;
