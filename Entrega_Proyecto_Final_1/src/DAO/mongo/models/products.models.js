import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";


const productsCollection = `products`

const productsSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    thumbnail:String,
    code:Number,
    stock: Number,
})

productsSchema.plugin(mongoosePaginate)

mongoose.set(`strictQuery`,false)

const productsModel = mongoose.model(productsCollection,productsSchema)


export default productsModel