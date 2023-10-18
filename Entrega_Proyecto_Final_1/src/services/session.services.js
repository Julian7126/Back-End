import { generateToken } from "../utils.js";
import RegisterUserDTO from "../DAO/DTO/register-user.dto.js";
import logger from "../middleware/logger/configLogger.js";

export default class UserService {
  constructor(userDAO) {
    this.userDAO = userDAO;
  }

  loginUser = async (user) => {
    if (!user || !user.email) {
      logger.error("Credenciales inválidas");
    }

    const access_token = generateToken(user);

    return { user, access_token };
  };




   
  // registerUser = async (user) => {
  //   try {
  //     logger.info("services", user)
  //     const userinfo = { password , ...user }
  //     const access_token = generateToken(userinfo);
  //     return {  access_token };
  //   } catch (err) {
  //     logger.error("Fallo en el registro de nuevo usuario ", err);
     
      
  //   }
  // };
  
  registerUser = async (user) => {
    try {
      logger.info("services", user);
  

      if (!user.password) {
       logger.error("La propiedad 'password' no está definida en el objeto 'user'.");
      }
      const { password, ...userinfo } = user;
  
      const access_token = generateToken(userinfo);
  
      return { access_token };
    } catch (err) {
      logger.error("Fallo en el registro de nuevo usuario ", err);
    }
  };
  



  getCurrentUser = (user) => {
    if (!user) {
      logger.error("Usuario no encontrado en la sesión");
    }
    return user;
  };
}
