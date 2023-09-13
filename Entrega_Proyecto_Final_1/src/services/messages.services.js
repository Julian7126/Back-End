export default class MessageRepository {
  constructor(dao) {
    this.dao = dao;
  }

  async retrieveMessages() {
    return await this.dao.retrieveMessages();
  }

  async createMessage(data, socket = null) {
    const result = await this.dao.createMessage(data);
    if (socket) {
      socket.emit('nuevo_mensaje', result);
    }
    return result;
  }
}
