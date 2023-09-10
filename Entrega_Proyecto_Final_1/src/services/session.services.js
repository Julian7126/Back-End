import UserDTO from "../DAO/DTO/user.dto.js";

export default class UserRepository {
  constructor(dao) {
    this.dao = dao;
  }

  loginUser = async ({ email, password }) => {
    const user = await this.dao.loginUser({ email, password });
    if (!user) {
      throw new Error("Invalid Credentials");
    }
    return new UserDTO(user);
  }

  registerUser = async (user) => {
    const userToRegister = new UserDTO(user);
    return await this.dao.registerUser(userToRegister);
  }

  logoutUser = () => {
    return true;
  }

  getCurrentUser = (user) => {
    const currentUser = new UserDTO(user);
    return { status: 'success', payload: currentUser };
  }
}
