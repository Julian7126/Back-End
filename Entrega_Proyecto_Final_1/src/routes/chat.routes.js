import express from "express"
import messagesModel from "../dao/models/messages.model.js";


const chatRouter = express.Router()

chatRouter.get('/', async (require, response) => {
    try {
      // Obtener todos los mensajes de la colección "messages" en MongoDB
      const messages = await messagesModel.find().lean();
      response.render('chat', { messages }); // Renderiza la vista "chat.handlebars" y pasa mensajes
    } catch (error) {
      console.error('Error al guardar el mensaje:', error);
      response.status(404).send('Error interno del servidor');
    }
  });



  export default chatRouter