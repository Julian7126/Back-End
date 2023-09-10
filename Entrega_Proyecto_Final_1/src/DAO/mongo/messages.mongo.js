import messagesModel from './models/messages.model.js';

export default class MessagesMongo {
  async retrieveMessages() {
    return await messagesModel.find().lean();
  }

  async createMessage(data) {
    return await messagesModel.create(data);
  }
}