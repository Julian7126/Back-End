import express from "express"
import messagesModel from "../dao/models/messages.model.js";


const chatRouter = express.Router()

chatRouter.get('/', async (request, response) => {
    try {
      // mensajes de mongo
      const messages = await messagesModel.find().lean();
      response.render('chat', { messages }); 
    } catch (error) {
      console.error('Error al guardar el mensaje:', error);
      response.status(404).send('Error interno del servidor');
    }
  });



  export default chatRouter