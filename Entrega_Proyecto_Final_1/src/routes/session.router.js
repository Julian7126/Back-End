import express from "express";
import UserModel from "../dao/models/user.models.js";

const sessionRouter = express.Router();

sessionRouter.post("/login", async (request, response) => {
  const { email, password } = request.body;
  const user = await UserModel.findOne({ email, password });
  if (!user) return response.redirect("login");

  if (
    user.email === "adminCoder@coder.com" &&
    user.password === "adminCod3r123"
  ) {
    user.role = "admin";
  } else {
    user.role = "usuario";
  }

  request.session.user = user;

  return response.redirect("/list");
});


sessionRouter.post("/register", async (request, response) => {
  const user = request.body;
  await UserModel.create(user);

  return response.redirect("/login");
});



sessionRouter.get("/logout", async (request, response) => {
  request.session.destroy(() => {
    response.redirect("/login");
  });
});


  
export default sessionRouter;
