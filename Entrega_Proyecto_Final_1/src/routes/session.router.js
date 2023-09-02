import express from "express";
import UserModel from "../dao/models/user.models.js";
import { createHash, generateToken, isValidPassword , passportCall , authToken, authorization } from "../utils.js";
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
 //jwt
    const access_token = generateToken(user);
    console.log("Token generado:", access_token);
    response.cookie('CoderCookieJulian', access_token, { maxAge: 24 * 60 * 60 * 1000 });



    // response.send({ status: "success", access_token });
    


    return response.redirect("/list") ;
  } else {
    return response.status(400).send("Invalid Credentials");
  }
});





sessionRouter.post("/register", passport.authenticate("register", {
  failureRedirect: "/register",
}) , async (request, response) => {
//cuando el usuario se registro con exito
const user = request.user; 
  if (!user) {
    return response.status(400).send("User not found");
  }
//jwt
  const access_token = generateToken(user);
  response.cookie('CoderCookieJulian', access_token, { maxAge: 24 * 60 * 60 * 1000 });
  // response.send({ status: "success", access_token });

  
  return response.redirect("/");
});



sessionRouter.get("/logout", async (request, response) => {
  request.session.destroy(() => {
    response.clearCookie('CoderKeyFromJulian');
    response.redirect("/");
  });
});


sessionRouter.get('/current', passport.authenticate(`jwt`), (request, response) => {
  response.send({ status: 'success', payload: request.user })
 })
  
export default sessionRouter;



// passportCall('jwt'), authorization('user')
