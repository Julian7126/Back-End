import messagesModel from '../models/messages.model.js';

export const retrieveMessages = async () => {
  try {
    return await messagesModel.find().lean();
  } catch (error) {
    throw new Error('Error al obtener mensajes');
  }
};

export const createMessage = async (data, socket) => {
    try {
      await messagesModel.create(data);
      if (socket) {
        socket.emit('nuevo_mensaje', data);
      }
    } catch (error) {
      throw new Error('Error al crear mensaje');
    }
  };
