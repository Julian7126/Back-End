import LoginUserDTO from "../DAO/DTO/login-user.dto.js";
import RegisterUserDTO from "../DAO/DTO/register-user.dto.js";
import passport from "passport";
import { generateToken } from "../utils.js";

export default class UserService {
  constructor(dao) {
    this.dao = dao;
  }

  loginUser = async ({ email, password }) => {
    const loginUserDTO = new LoginUserDTO({ email, password });
    const user = await passport.authenticate('login', loginUserDTO);
    if (!user) {
      throw new Error("Invalidas Credenciales");
    }

    // Asignar rol
    if (email === "adminCoder@coder.com") {
      user.role = "admin";
    } else {
      user.role = "usuario";
    }

    const access_token = generateToken(user);
    
    return { user, access_token }; 
  }

  registerUser = async (user) => {
    const registerUserDTO = new RegisterUserDTO(user);
    const registeredUser = await passport.authenticate('register', registerUserDTO);
    if (!registeredUser) {
      throw new Error("Could not register user");
    }

    const access_token = generateToken(registeredUser);
    return { user: registeredUser, access_token }; 
  }

  logoutUser = () => {
    return true;
  }

  getCurrentUser = (user) => {
    return { status: 'success', payload: user };
  }
}
