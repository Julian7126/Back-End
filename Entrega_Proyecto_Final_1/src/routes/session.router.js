
import express from "express";
import { login, register, logout, currentUser ,deleteUser, premiumUser, uploadDocuments ,getAllUser , deleteAll } from "../controller/sessionController.js";
import passport from "passport";
import upload  from "../services/multer/upload.js";

import { isAdmin } from "../middleware/validaciones.js";



const sessionRouter = express.Router();

sessionRouter.post("/login", passport.authenticate("login"), login);
sessionRouter.post("/register", passport.authenticate("register"), register);
sessionRouter.get("/logout", logout);
sessionRouter.get("/current", passport.authenticate("jwt"), currentUser);
sessionRouter.post("/delete/:id", deleteUser)
sessionRouter.put("/premium/:uid", premiumUser);


sessionRouter.get("/all", passport.authenticate("jwt"), isAdmin,  getAllUser )
sessionRouter.delete("/delete/all", passport.authenticate("jwt"),isAdmin, deleteAll)



sessionRouter.post("/:uid/documents", passport.authenticate("jwt"), upload.array('files'), uploadDocuments);


export default sessionRouter;
