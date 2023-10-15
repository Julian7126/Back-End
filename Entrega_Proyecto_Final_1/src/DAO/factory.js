import mongoose from 'mongoose';
import config from '../config/config.js';
import { viewsService } from '../services/index.js';

export async function connectMongo() {
  try {
    await mongoose.connect(config.MONGO_URL, {
      dbName: config.dbName,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("DB conectada");
  } catch (err) {
    console.log("No se pudo conectar a la base de datos");
  }
}

export let Carts;
export let User;
export let Products;
export let Messages;
export let Tickets;
export let Views;

console.log(`Persistence with ${config.persistence}`);

switch (config.persistence) {
  case "MONGO":
    await connectMongo();

    const { default: CartsMongo } = await import("../DAO/mongo/carts.mongo.js");
    const { default: UserMongo } = await import("../DAO/mongo/user.mongo.js");
    const { default: ProductsMongo } = await import("../DAO/mongo/products.mongo.js");
    const { default: MessagesMongo } = await import("../DAO/mongo/messages.mongo.js");
    const { default: TicketsMongo } = await import("../DAO/mongo/ticket.mongo.js");
    const { default: ViewsMongo} = await import ("../DAO/mongo/views.mongo.js")


    Carts = CartsMongo;
    User = UserMongo;
    Products = ProductsMongo;
    Messages = MessagesMongo;
    Tickets = TicketsMongo;
    Views = ViewsMongo;
    break;

  case 'FILE':
    const { default: UserFile } = await import('./files/user.file.js');
    const { default: CartsFile } = await import('./files/carts.file.js');
    const { default: ProductsFile } = await import('./files/products.file.js');
    const { default: MessagesFile } = await import('./files/messages.file.js');
    const { default: TicketsFile } = await import('./files/ticket.file.js');
    const { default: ViewsFile} = await import ("./files/views.file.js")



    User = UserFile;
    Carts = CartsFile;
    Products = ProductsFile;
    Messages = MessagesFile;
    Tickets = TicketsFile;
    Views = ViewsMongo
    break;

  default:
    console.log("No se eligió una opción de persistencia válida.");
    break;
}
