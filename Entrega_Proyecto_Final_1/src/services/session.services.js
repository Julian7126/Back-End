import passport from "passport";
import { generateToken } from "../utils.js";
import RegisterUserDTO from "../DAO/DTO/register-user.dto.js";

export default class UserService {
  constructor(dao) {
    this.dao = dao;
  }

  
  loginUser = async (user) => {
    if (!user || !user.email) {
      throw new Error("Invalidas Credenciales");
    }
    
    // Generar el token de acceso
    const access_token = generateToken(user);
    
    const { email } = user;
    
    // Asignar rol al usuario
    if (email === "adminCoder@coder.com") {
      user.role = "admin";
    } else {
      user.role = "usuario";
    }

    console.log('User in loginUser service:', user); // Depuración

    // Devolver el objeto 'user' y el token de acceso
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
    if (!user) {
      throw new Error("Usuario no encontrado en la sesión");
    }
    return user; 
  };
  
}
