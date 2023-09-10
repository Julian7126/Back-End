import MessageDTO from "../DAO/DTO/messages.dto.js";

export default class MessageRepository {
  constructor(messageDAO) {
    this.messageDAO = messageDAO;
  }

  async retrieveMessages() {
    return await this.messageDAO.retrieveMessages();
  }

  async createMessage(data, socket = null) {
    const messageToCreate = new MessageDTO(data);
    const result = await this.messageDAO.createMessage(messageToCreate);
    if (socket) {
      socket.emit('nuevo_mensaje', result);
    }
    return result;
  }
}
