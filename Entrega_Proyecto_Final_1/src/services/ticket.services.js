import crypto from 'crypto';

export default class TicketService {
  constructor(dao) {
    this.dao = dao;
  }
  
  getTicket = async () => {
    const ticket = await this.dao.find(); 
    return ticket;
  };

  getTicketById = async (id) => {
   const ticketId=  await this.dao.findOne({ _id: id }); 
   return ticketId;
    
  };

  createTicket = async (user, products) => {
    const amount = 1;

    const code = crypto.randomBytes(4).toString('hex');
  
    const ticket = {
      code: code,
      purchase_datetime: new Date(),
      amount: amount,
      purchaser: user ? user.email : 'email@example.com', 
      products: products.map(product => product._id),
      user: user ? user._id : null, 
    };
  
    return await this.dao.create(ticket).populate('products').exec();;  
  };


  updateTicket = async (id, ticketData) => {
    return await this.dao.updateOne({ _id: id }, { $set: ticketData });  
  };

  getTicketByCartId = async (products) => {
    return await this.dao.findOne({ products });  

  updateTicketStatus = async (ticketId, status) => {
    return await this.dao.updateOne({ _id: ticketId }, { $set: { status } });  
  };
  }
}

