import express from "express";
import * as ticketController from "../controller/ticket.Controller.js";


const ticketRouter = express.Router();

ticketRouter.get("/", ticketController.getTicket); 
ticketRouter.get("/:tid", ticketController.getTicketById);
ticketRouter.post("/", ticketController.createTicket);

export default ticketRouter;
