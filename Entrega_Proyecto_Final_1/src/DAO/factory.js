import config from "../config/config.js";


export let Carts;
export let User;
export let Products;
export let Messages;

console.log(`Persistence with ${config.persistence}`);

switch (config.persistence) {
  case "MONGO":
  
    const { default: CartsMongo } = await import("../DAO/mongo/carts.mongo.js");
    const { default: UserMongo } = await import("../DAO/mongo/user.mongo.js");
    const { default: ProductsMongo } = await import("../DAO/mongo/products.mongo.js");
    const { default: MessagesMongo } = await import("../DAO/mongo/messages.mongo.js");


    Carts = CartsMongo
    User = UserMongo;
    Products = ProductsMongo;
    Messages = MessagesMongo;

    break;

  default:
    break;
}
