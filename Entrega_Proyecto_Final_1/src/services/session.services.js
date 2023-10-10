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

  registerUser = async (user) => {
    try {
      const newUser = await this.userDAO.createUser(user);
      const access_token = generateToken(newUser);

      return { user: newUser, access_token };
    } catch (err) {
      logger.error("Fallo en el registro de nuevo usuario ", err);
      throw err; 
      
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
