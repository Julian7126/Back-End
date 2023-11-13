
import express from "express";
import { login, register, logout, currentUser ,deleteUser, premiumUser, uploadDocuments } from "../controller/sessionController.js";
import passport from "passport";
import upload  from "../services/multer/upload.js";

const sessionRouter = express.Router();

sessionRouter.post("/login", passport.authenticate("login"), login);
sessionRouter.post("/register", passport.authenticate("register"), register);
sessionRouter.get("/logout", logout);
sessionRouter.get("/current", passport.authenticate("jwt"), currentUser);
sessionRouter.delete("/delete/:id", deleteUser)
sessionRouter.put("/premium/:uid", premiumUser);

sessionRouter.post("/:uid/documents", passport.authenticate("jwt"), upload.array('files'), uploadDocuments);


export default sessionRouter;
