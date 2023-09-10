import UserModel from './models/user.models.js';
import { isValidPassword, generateToken } from '../../utils.js';

export default class User {
  async loginUser({ email, password }) {
    const user = await UserModel.findOne({ email });
  
    if (!user || !isValidPassword(user, password)) {
      throw new Error("Invalid Credentials");
    }
  
    if (user.email === "adminCoder@coder.com") {
      user.role = "admin";
    } else {
      user.role = "usuario";
    }
  
    const access_token = generateToken(user);
    return { user, access_token };
  }

  async registerUser(user) {
    if (!user) {
      throw new Error("User not found");
    }
  
    const access_token = generateToken(user);
    return { user, access_token };
  }

  logoutUser() {
    return true;
  }

  getCurrentUser(user) {
    return { status: 'success', payload: user };
  }
}
