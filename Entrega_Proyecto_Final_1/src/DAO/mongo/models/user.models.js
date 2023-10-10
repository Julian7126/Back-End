import mongoose from "mongoose";

const UserModel = mongoose.model('users', new mongoose.Schema({
    first_name: String,
    last_name: String,
    age: Number,
    email: {
        type: String,
        unique: true,
        required: true,
    },
    cartId: { type: mongoose.Schema.Types.ObjectId, ref: "carts" },
    password: String,
    role: {
        type: String,
        default: 'premium', 
    
    },
    ticket: { type: mongoose.Schema.Types.ObjectId, ref: "tickets" },
}));

export default UserModel;