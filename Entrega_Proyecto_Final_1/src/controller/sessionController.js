import { sessionService } from "../services/index.js";
import config from "../config/config.js";


export const login = async (request, response) => {
  try {
    const { user, access_token } = await sessionService.loginUser(request.user);
    
    console.log("User:", user); // Depuración
    console.log("Access Token:", access_token); // Depuración
    
    // Guardar el objeto 'user' completo en la sesión
    request.session.user = user;
    
    // Establecer la cookie con el token de acceso
    response.cookie(config.PRIVATE_KEY_COOKIE, access_token, { maxAge: 24 * 60 * 60 * 1000 });
    
    // Redirigir al usuario
    return response.redirect("/list");
  } catch (error) {
    return response.status(400).send(error.message);
  }
};


export const register = async (request, response) => {
  try {
    const { user, access_token } = await sessionService.registerUser(request.body);  
    response.cookie(config.PRIVATE_KEY_COOKIE, access_token, { maxAge: 24 * 60 * 60 * 1000 });
    return response.redirect("/");
  } catch (error) {
    return response.status(400).send(error.message);
  }
};

export const logout = async (request, response) => {
  try {
    sessionService.logoutUser();
    request.session.destroy(() => {
      response.clearCookie(config.PRIVATE_KEY_COOKIE);
      response.redirect("/");
    });
  } catch (error) {
    return response.status(400).send(error.message);
  }
};

export const currentUser = async (request, response) => {
  try {
    const user = await sessionService.getCurrentUser(request.user); // Asumiendo que podría ser una operación asíncrona
    return response.status(200).json({ status: 'success', payload: user });
  } catch (error) {
    return response.status(400).json({ status: 'error', message: error.message });
  }
};

