import { Carts, Products, User , Messages  } from '../DAO/factory.js';
import CartRepository from './cart.services.js';
import ProductRepository from './products.services.js';
import UserRepository from './session.services.js'; 
import MessageRepository from './chat.services.js';

export const cartService = new CartRepository(new Carts());
export const productService = new ProductRepository(new Products());
export const sessionService = new UserRepository(new User());
export const messageService = new MessageRepository(new Messages());
