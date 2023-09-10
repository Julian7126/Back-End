import * as sessionService from '../services/session.services.js';
import config from "../config/config.js";

export const login = async (request, response) => {
  try {
    const { user, access_token } = await sessionService.loginUser(request.body);
    request.session.user = user.payload; 
    response.cookie(config.PRIVATE_KEY_COOKIE, access_token, { maxAge: 24 * 60 * 60 * 1000 });
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

export const currentUser = (request, response) => {
  try {
    const user = sessionService.getCurrentUser(request.session.user); 
    return response.send(user);
  } catch (error) {
    return response.status(400).send(error.message);
  }
};
