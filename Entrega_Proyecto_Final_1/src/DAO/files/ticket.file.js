import fs from 'fs';

export default class TicketsFile {

  constructor(filename = 'tickets.json') {
    this.filename = filename;
    if (!fs.existsSync(this.filename)) {
      fs.writeFileSync(this.filename, '[]');
    }
  }

  async getTicket() {
    return await this.get();
  }

  async getTicketById(id) {
    const db = await this.get();
    return db.find(ticket => ticket.id === id);
  }

  async createTicket(ticket) {
    const db = await this.get();
    db.push(ticket);
    return fs.promises.writeFile(this.filename, JSON.stringify(db));
  }

  async updateTicket(id, updatedTicket) {
    const db = await this.get();
    const ticketIndex = db.findIndex(ticket => ticket.id === id);
    if (ticketIndex !== -1) {
      db[ticketIndex] = { ...db[ticketIndex], ...updatedTicket };
      await fs.promises.writeFile(this.filename, JSON.stringify(db));
      return db[ticketIndex];
    }
    return null;
  }

  get = async () => {
    return fs.promises.readFile(this.filename, {encoding: 'utf-8'})
      .then(r => JSON.parse(r));
  }
}
