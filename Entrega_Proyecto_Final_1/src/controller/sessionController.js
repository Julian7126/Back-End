import { sessionService } from "../services/index.js";
import config from "../config/config.js";


export const login = async (request, response , next) => {
  try {
    const { user, access_token } = await sessionService.loginUser(request.user);
    // console.log("user payload", user.payload)
    console.log("User:", user); // Depuración
    console.log("Access Token:", access_token); // Depuración
    
  //  request.session.user=user.payload
    request.session.user = user;
    
    response.cookie(config.PRIVATE_KEY_COOKIE, access_token, { maxAge: 24 * 60 * 60 * 1000 });
    
    // Redirigir al usuario
    return response.redirect("/list");
  } catch (err) {
    next(err)
  }
};


export const register = async (request, response, next) => {
  try {
    const { user, access_token } = await sessionService.registerUser(request.body);  
    response.cookie(config.PRIVATE_KEY_COOKIE, access_token, { maxAge: 24 * 60 * 60 * 1000 });
    return response.redirect("/");
  } catch (err) {
    next(err)
  }
};

export const logout = async (request, response , next) => {
  try {
    sessionService.logoutUser();
    request.session.destroy(() => {
      response.clearCookie(config.PRIVATE_KEY_COOKIE);
      response.redirect("/");
    });
  } catch (err) {
    next(err)
  }
};

export const currentUser = async (request, response, next) => {
  try {
    const user = await sessionService.getCurrentUser(request.user);
    return response.status(200).json({ status: 'success', payload: user });
  } catch (err) {
    next(err)
  }
};

