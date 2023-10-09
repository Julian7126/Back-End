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
        default: 'user', 
        enum: ['user', 'admin', 'premium'], 
    },
    isPremium: {
        type: Boolean,
        default: false, 
    },
    ticket: { type: mongoose.Schema.Types.ObjectId, ref: "tickets" },
}));

export default UserModel;