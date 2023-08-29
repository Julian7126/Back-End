import mongoose from "mongoose";

const UserModel = mongoose.model('users', new mongoose.Schema({
    
    
    first_name:String,
    last_name:String,
    age:Number,
    email: {
        type :String,
        unique: true,
    },
    cartId: {
        type: String,
        default: "64d18007537d2a26e7b6bb3f",
      },
    password: String,
    role: {
        type :String,
        unique: true,
        default: 'user',  
      },
}))

export default UserModel