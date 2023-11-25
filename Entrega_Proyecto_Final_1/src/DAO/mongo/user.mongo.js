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

  getAllUsers() {
    return UserModel.find({});
  }

  findInactiveUsers(twoWeeksAgo) {
    return UserModel.find({ last_connection: { $lt: twoWeeksAgo } });
  }

  deleteInactiveUsers(twoWeeksAgo) {
    return UserModel.deleteMany({ last_connection: { $lt: twoWeeksAgo } });
  }

  updateLastConnection(email) {
    return UserModel.findOneAndUpdate({ email }, { last_connection: Date.now() });
  }

}
