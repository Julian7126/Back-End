import { generateToken } from "../utils.js";
import RegisterUserDTO from "../DAO/DTO/register-user.dto.js";
import logger from "../middleware/logger/configLogger.js";
import path from 'path';

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
      logger.info("services", user)
      const { password , ...userInfo } = user
      const access_token = generateToken(userInfo);
      return { userInfo, access_token };
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

  
  deleteUser = async (userId) => {
  
      const deleted = await this.userDAO.deleteUser(userId);
      
      if (deleted) {
        logger.info("Usuario eliminado con éxito");
      } else {
        logger.error("Error al eliminar al usuario");
        
      }

  };


 premiumUser = async (userId) => {
    try {
      const user = await this.userDAO.getUserById(userId);
      if (!user) {
        logger.error("Usuario no encontrado");
        return null;
      }
      if (user.role !== 'admin') {
        user.role = 'premium';
        await user.save();

        logger.info("actualizado a premium con éxito");
      } else {
        logger.info("ya es admin', no se necesita actualizar");
      }

      return user;
    } catch (err) {
      logger.error("err al actualizar a usuario premium", err);
      throw err;
    }
  };


  uploadDocuments = async (userId, files) => {
    try {
      const user = await this.userDAO.getUserById(userId);
  
      if (!user) {
        logger.error("Usuario no encontrado");
        return null;
      }
  
      const userFolder = path.join(__dirname, '..', 'public', 'documents', user._id.toString());
  
      if (!fs.existsSync(userFolder)) {
        fs.mkdirSync(userFolder, { recursive: true });
      }
  
  
      user.documents = [];
  
      files.forEach(file => {
        const documentInfo = {
          name: file.originalname,
          reference: path.join(userFolder, file.filename),
        };

        user.documents.push(documentInfo)
        fs.renameSync(file.path, path.join(userFolder, file.filename));
      });
  
     
      await user.save();
      return user;
    } catch (err) {
      logger.error("Error al manejar la subida de documentos:", err);
      throw err;
    }
  };
  

}
