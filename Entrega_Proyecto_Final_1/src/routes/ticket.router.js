import express from "express"
import * as ticketController from "../controller/ticket.Controller.js";


const ticketRouter = express.Router()

ticketRouter.get("/", getTicket)
ticketRouter.get("/:tid", getTicketByID)
ticketRouter.post("/", createTicket)
ticketRouter.post("/:tid", resolveTicket)


export default ticketRouter