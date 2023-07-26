import mongoose from "mongoose";


const productsCollection = `products`

const productsSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    thumbnail:String,
    code:Number,
    stock: Number,
})


mongoose.set(`strictQuery`,false)

const productsModel = mongoose.model(productsCollection,productsSchema)


export default productsModel