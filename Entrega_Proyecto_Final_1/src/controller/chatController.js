import * as chatService from '../services/chat.services.js';

export const getMessages = async (req, res) => {
  try {
    const messages = await chatService.retrieveMessages();
    res.render('chat', { messages });
  } catch (error) {
    console.error('Error al obtener los mensajes:', error);
    res.status(500).send('Error interno del servidor');
  }
};

export const addMessage = async (data, socket = null, res = null) => {
  try {
    const { email, message } = data;

    if (!email || !message) {
      if (socket) {
        socket.emit('error', 'Faltan datos');
      }
      if (res) {
        res.status(400).send('Faltan datos');
      }
      return;
    }

    await chatService.createMessage({ email, message }, socket);

    if (socket) {
      socket.emit('nuevo_mensaje', { email, message });
    }
    if (res) {
      res.status(200).send('Mensaje agregado');
    }
  } catch (error) {
    console.error('Error al guardar el mensaje:', error);
    if (socket) {
      socket.emit('error', 'Error interno del servidor');
    }
    if (res) {
      res.status(500).send('Error interno del servidor');
    }
  }
};