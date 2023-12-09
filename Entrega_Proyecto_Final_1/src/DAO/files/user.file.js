import fs from 'fs';

export default class UserFile {

  constructor(filename = 'users.json') {
    this.filename = filename;
    if (!fs.existsSync(this.filename)) {
      fs.writeFileSync(this.filename, '[]');
    }
  }

  async createUser(user) {
    const db = await this.get();
    if (!user.role) {
      user.role = "premium"
    }
    db.push(user);
    await this.writeFile(db);
  }

  async getUserByEmail(email) {
    const db = await this.get();
    return db.find(user => user.email === email);
  }

  async getUserById(id) {
    const db = await this.get();
    return db.find(user => user.id === id);
  }

  async deleteUser(id) {
    const db = await this.get();
    const newDb = db.filter(user => user.id !== id);
    await this.writeFile(newDb);
  }

  async getAllUsers() {
    return await this.get();
  }

  async findInactiveUsers(twoWeeksAgo) {
    const db = await this.get();
    return db.filter(user => user.last_connection < twoWeeksAgo);
  }

  async deleteInactiveUsers(twoWeeksAgo) {
    const db = await this.get();
    const newDb = db.filter(user => user.last_connection >= twoWeeksAgo);
    await this.writeFile(newDb);
  }

  async updateLastConnection(email) {
    const db = await this.get();
    const user = db.find(u => u.email === email);
    if (user) {
      user.last_connection = Date.now();
      await this.writeFile(db);
    }
  }

  get = async () => {
    return fs.promises.readFile(this.filename, { encoding: 'utf-8' })
      .then(r => JSON.parse(r))
      .catch(error => {
        console.error('Error reading file:', error);
        return [];
      });
  }

  writeFile = async (data) => {
    await fs.promises.writeFile(this.filename, JSON.stringify(data, null, 2));
  }
}
