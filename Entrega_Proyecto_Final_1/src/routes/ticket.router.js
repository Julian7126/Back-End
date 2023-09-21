import express from "express";
import passport from "passport";
import * as ticketController from "../controller/ticket.Controller.js";

const ticketRouter = express.Router();

ticketRouter.get("/", passport.authenticate("jwt"), ticketController.getTicket);
ticketRouter.get("/:tid", passport.authenticate("jwt"), ticketController.getTicketById);
ticketRouter.post("/", passport.authenticate("jwt"), ticketController.createTicket);


export default ticketRouter;
