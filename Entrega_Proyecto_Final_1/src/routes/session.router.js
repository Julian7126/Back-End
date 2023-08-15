import express from "express";
import UserModel from "../dao/models/user.models.js";
import { createHash, isValidPassword } from "../utils.js";
import passport from "passport";


const sessionRouter = express.Router();

sessionRouter.post("/login", passport.authenticate(`login`,`/login`), async (request, response) => {
  const { email, password } = request.body;
  const user = await UserModel.findOne({ email });


  if(!request.user) return response.status(400).send(`Invalid Credentials`)

  if (
    user.email === "adminCoder@coder.com" &&
    user.password === "adminCod3r123"
  ) {
    user.role = "admin";
  } else {
    user.role = "usuario";
  }

  request.session.user = request.user;

  return response.redirect("/list");
});


sessionRouter.post("/register",passport.authenticate(`register`, {
  failureRedirect: `/register`,
}), async (request, response) => {

  return response.redirect("/login");
});



sessionRouter.get("/logout", async (request, response) => {
  request.session.destroy(() => {
    response.redirect("/login");
  });
});


  
export default sessionRouter;
