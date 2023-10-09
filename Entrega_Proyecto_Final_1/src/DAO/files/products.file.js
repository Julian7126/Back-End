import fs from 'fs';

export default class ProductsFile {
  constructor(filename = 'products.json') {
    this.filename = filename;
    if (!fs.existsSync(this.filename)) {
      fs.writeFileSync(this.filename, '[]');
    }
  }

  async create(user, product) {
    if (user.role === "premium" || user.role === "admin") {
      const db = await this.get();
      product.owner = user.email;
      db.push(product);
      return fs.promises.writeFile(this.filename, JSON.stringify(db));
    } else { 
      throw new Error("Solo los usuarios premium o admin pueden crear productos.");
    }
  }

  async delete(productId) {
    const db = await this.get();
    const newDb = db.filter(product => product.id !== productId);
    return fs.promises.writeFile(this.filename, JSON.stringify(newDb));
  }

  async findProductByCode(productCode) {
    const db = await this.get();
    return db.find(product => product.code === productCode);
  }

  async findProductById(productId) {
    const db = await this.get();
    return db.find(product => product.id === productId);
  }

  async update(productId, updatedFields) {
    const db = await this.get();
    const productIndex = db.findIndex(product => product.id === productId);
    if (productIndex !== -1) {
      db[productIndex] = { ...db[productIndex], ...updatedFields };
      await fs.promises.writeFile(this.filename, JSON.stringify(db));
      return db[productIndex];
    }
    return null;
  }

  get = async () => {
    return fs.promises.readFile(this.filename, { encoding: 'utf-8' })
      .then(r => JSON.parse(r));
  }
}
