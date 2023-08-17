import express from "express";
import UserModel from "../dao/models/user.models.js";
import { createHash, isValidPassword } from "../utils.js";
import passport from "passport";


const sessionRouter = express.Router();

sessionRouter.post("/login", passport.authenticate(`login`,`/login`), async (request, response) => {
  const { email, password } = request.body;
  const user = await UserModel.findOne({ email });

  if (!user) {
    return response.status(400).send("Invalid Credentials");
  }
//password adminCod3r123
  if (isValidPassword(user, password)) {
    if (user.email === "adminCoder@coder.com") {
      user.role = "admin";
    } else {
      user.role = "usuario";
    }
    request.session.user = user;
    return response.redirect("/list");
  } else {
    return response.status(400).send("Invalid Credentials");
  }
});




sessionRouter.post("/register",passport.authenticate(`register`, {
  failureRedirect: `/register`,
}), async (request, response) => {

  return response.redirect("/");
});



sessionRouter.get("/logout", async (request, response) => {
  request.session.destroy(() => {
    response.redirect("/");
  });
});



  
export default sessionRouter;
