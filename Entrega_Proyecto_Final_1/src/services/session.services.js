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



  //por ahora usamos la logica de passport en el config , sino se intenta crear 2 vecces
   
  registerUser = async (user) => {
    try {
      logger.info("services", user)
      const access_token = generateToken(user);
      return {  access_token };
    } catch (err) {
      logger.error("Fallo en el registro de nuevo usuario ", err);
     
      
    }
  };
  
  logoutUser = (request) => {
    return new Promise((resolve, reject) => {
      try {
        request.logout();

        request.session.destroy(() => {
          resolve(true);
        });
      } catch (err) {
        reject(err);
      }
    });
  };
  


  getCurrentUser = (user) => {
    if (!user) {
      logger.error("Usuario no encontrado en la sesión");
    }
    return user;
  };
}
