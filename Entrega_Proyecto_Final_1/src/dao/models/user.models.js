import mongoose from "mongoose";

const UserModel = mongoose.model('users', new mongoose.Schema({
    
    
    first_name:String,
    last_name:String,
    age:Number,
    email: {
        type :String,
        unique: true,
    },
    cartId: { type: mongoose.Schema.Types.ObjectId, ref: "carts" },
    password: String,
    role: {
        type :String,
        unique: true,
        default: 'user',  
      },
}))

export default UserModel



