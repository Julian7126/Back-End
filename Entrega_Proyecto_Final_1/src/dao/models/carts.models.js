import mongoose from "mongoose";


const cartsCollection = `carts`

const productsSchema = new mongoose.Schema({

    products: { type: mongoose.Schema.Types.ObjectId, ref: "Products", required: true },
    
    quantity: { type: Number, required: true }
    
    });
    
const cartsSchema = new mongoose.Schema({
    
    cartsId: { type: String, required: true },
    
    products: [productsSchema]
    
    });


mongoose.set(`strictQuery`,false)

const cartsModel = mongoose.model(cartsCollection,cartsSchema)


export default cartsModel