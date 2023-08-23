import mongoose from "mongoose";

const UserModel = mongoose.model('users', new mongoose.Schema({

    email: {
        type :String,
        unique: true,
    },
    password: String,
    role: {
        type :String,
        unique: true,
        default: 'user',  
      },
}))

export default UserModel