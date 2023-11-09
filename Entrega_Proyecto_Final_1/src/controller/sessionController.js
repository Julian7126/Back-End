import { sessionService } from "../services/index.js";
import config from "../config/config.js";
import  logger  from "../middleware/logger/configLogger.js"


export const login = async (request, response , next) => {
  try {
    const { user, access_token } = await sessionService.loginUser(request.user);
    
 
    logger.info( "usuario es:" , user)
    console.log("Access Token:", access_token);
    
  
    request.session.user = user;
    
    response.cookie(config.PRIVATE_KEY_COOKIE, access_token, { maxAge: 24 * 60 * 60 * 1000 });
    
    
    return response.redirect("/list");
  } catch (err) {
    logger.error("Error en el inicio de sesión:", err);
    next(err)
  }
};


export const register = async (request, response, next) => {
  try {
    const user = request.body;
    const { user: registeredUser, access_token } = await sessionService.registerUser(user);
    response.cookie(config.PRIVATE_KEY_COOKIE, access_token, { maxAge: 24 * 60 * 60 * 1000 });
    logger.info("Se registró el usuario");
    return response.redirect("/");
  } catch (err) {
    logger.info("Error en el registro de usuario:", err);
    next(err)
  }
};


export const logout = async (request, response, next) => {
  try {
    request.logout((err) => {
      if (err) return next(err)
      response.clearCookie(config.PRIVATE_KEY_COOKIE);
      response.redirect('/');
    });
  } catch (err) {
    logger.error("Error en el cierre de sesión:", err);
    next(err);
  }
}


export const currentUser = async (request, response, next) => {
  
  try {
    const user = await sessionService.getCurrentUser(request.user);
    return response.status(200).json({ status: 'success', payload: user });
   
  } catch (err) {
    logger.error("Error al obtener el usuario actual:", err);
    next(err)
  }
};

export const deleteUser= async(request,  response, next)=>{
  try {
    const userId = request.params.id;

    const result = await sessionService.deleteUser(userId);

    if (result) {
      return response.status(200).json({ message: "Usuario eliminado con éxito" });
    } else {
      return response.status(404).json({ error: "Usuario no encontrado" });
    }

  } catch (err) {
    logger.error("Error al Elminar un Usuario",err);
    next(err)
    
  }
}
