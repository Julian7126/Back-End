import UserModel from './models/user.models.js';

export default class UserDAO {
  createUser(user) {
    return UserModel.create(user);
  }

  getUserByEmail(email) {
    return UserModel.findOne({ email });
  }

  getUserById(id) {
    return UserModel.findById(id);
  }

  deleteUser(id) {
    return UserModel.findByIdAndDelete(id);
  }
}
