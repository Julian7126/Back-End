import { messageService } from '../services/index.js';

export const getMessages = async (req, res, next) => {
  try {
    const messages = await messageService.retrieveMessages();
    res.render('chat', { messages });
  } catch (err) {
    console.error('Error al obtener los mensajes:', err);
    next(err)
  }
};

export const addMessage = async (data, socket = null, res = null, next) => {
  try {
    const savedMessage = await messageService.saveMessage(data);

    if (socket) {
      socket.emit('nuevo_mensaje', savedMessage);
    }
    if (res) {
      res.status(200).send('Mensaje agregado');
    }
  } catch (err) {
    console.error('Error al guardar el mensaje:', err);
    if (socket) {
      socket.emit('error', 'Error interno del servidor');
    }
    if (res) {
      next(err)
    }
  }
};
