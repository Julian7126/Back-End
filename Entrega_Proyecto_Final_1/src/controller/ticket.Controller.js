import { ticketService } from "../services/index.js";

export const getTicket = async (request, response, next) => {
  try {
    const user = request.user; 
    const result = await ticketService.getTicket(user);
    response.send({ status: 'success', payload: result });
  } catch (err) {
    next(err)
  }
};

export const getTicketById = async (request, response,next) => {
  try {
    const { tid } = request.params;
    const result = await ticketService.getTicketById(tid);
    response.send({ status: 'success', payload: result });
  } catch (err) {
    next(err)
  }
};




export const createTicket = async (request, response,next) => {
  try {
    const { user, cartId } = request.body; // usar postman 
    const result = await ticketService.createTicket(user, cartId);
    response.send({ status: 'success', payload: result });
  } catch (err) {
    next(err)
  }
};

export const resolveTicket = async (request, response, next) => {
  try {
    const { resolve } = request.query;
    const { tid } = request.params;
    const result = await ticketService.resolveTicket(tid, resolve);
    response.send({ status: 'success', payload: result });
  } catch (err) {
    next(err)
  }
};
