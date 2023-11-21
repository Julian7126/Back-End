import { ticketService , cartService} from "../services/index.js";
import logger from "../middleware/logger/configLogger.js"
import config from "../config/config.js";
import nodemailer from "nodemailer";


let transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 587,
  auth: {
    user: config.email,
    pass: config.password
  }
});






export const createTicket = async (request, response,next) => {
  try {
    const { user, cartId } = request.body; // usar postman 
    const result = await ticketService.createTicket(user, cartId);
    response.send({ status: 'success', payload: result });
  } catch (err) {
    logger.error("error al crear el ticket ", err)
    next(err)
  }
};


export const getTicket = async (request, response, next) => {
  try {
     const user = request.user;
     const ticketResult = await ticketService.getTicket(user);
     response.send({ status: 'success', payload: ticketResult });
    } catch (err) {
      logger.error("error al obtener el ticket", err);
      next(err);
    }
  };
 
  export const getTicketById = async (request, response, next) => {
    try {
      const { tid } = request.params;
      const result = await ticketService.getTicketById(tid);
  
   
      if (!result) {
        return next(new Error("No se encontró el ticket con el ID proporcionado"));
      }
  
      
      const { _id, amount, purchaser, cartId, user, status, code, __v } = result;
  
    
      const cartDetails = await cartService.getCartDetails(cartId);
  
    
      if (!cartDetails) {
        return next(new Error("No se encontraron detalles del carrito para el ticket"));
      }
  
     
      const resultEmail = await transporter.sendMail({
        from: config.email,
        to: purchaser,
        subject: "Se ha realizado la compra exitosamente, ¡muchas gracias por confiar en nosotros!",
        html: `
          <h1>Gracias por confiar en nosotros!</h1>
          <h2>Estos son los productos que has comprado:</h2>
          <ul>
          </ul>
          <!-- Puedes agregar más detalles según la estructura de tu carrito -->
        `,
        attachments: []
      });

      console.log(resultEmail)
  
      
      response.send({
        status: 'success',
        payload: {
          _id,
          amount,
          purchaser,
          cartId,
          user,
          status,
          code,
          __v,
        },
      });
    } catch (err) {
      logger.error("error al obtener el ticket por el id", err);
      next(err);
    }
  };
  

export const resolveTicket = async (request, response, next) => {
  try {
    const { resolve } = request.query;
    const { tid } = request.params;
    const result = await ticketService.resolveTicket(tid, resolve);
    response.send({ status: 'success', payload: result });
  } catch (err) {
    logger.error("error al resolver el ticket", err)
    next(err)
  }
};
