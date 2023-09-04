import UserModel from "../models/user.models.js";
import { isValidPassword, generateToken } from "../utils.js";


export const loginUser = async ({ email, password }) => {
  const user = await UserModel.findOne({ email });

  if (!user || !isValidPassword(user, password)) {
    throw new Error("Invalid Credentials");
  }

  if (user.email === "adminCoder@coder.com") {
    user.role = "admin";
  } else {
    user.role = "usuario";
  }

  const access_token = generateToken(user);
  return { user, access_token };
};

export const registerUser = async (user) => {
  if (!user) {
    throw new Error("User not found");
  }

  const access_token = generateToken(user);
  return { user, access_token };
};

export const logoutUser = () => {
  return true;
};

export const getCurrentUser = (user) => {
  return { status: 'success', payload: user };
};
