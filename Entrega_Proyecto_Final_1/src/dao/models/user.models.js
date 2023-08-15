import mongoose from "mongoose";

const UserModel = mongoose.model('users', new mongoose.Schema({

    email: {
        type :String,
        unique: true,
    },
    password: String,
    role: String
}))

export default UserModel