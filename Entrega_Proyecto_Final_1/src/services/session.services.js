import passport from "passport";
import { generateToken } from "../utils.js";
import RegisterUserDTO from "../DAO/DTO/register-user.dto.js";

export default class UserService {
  constructor(dao) {
    this.dao = dao;
  }

  loginUser = async (user) => {
    const access_token = generateToken(user);                         
      if (!user || !user.email) {
      throw new Error("Invalidas Credenciales");
    }
      const { email } = user;
  
      // Asignar rol
      if (email === "adminCoder@coder.com") {
        user.role = "admin";
      } else {
        user.role = "usuario";
      }

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
