
import logger from "../middleware/logger/configLogger.js";

export default class MyService {
  constructor(dao) {
    this.dao = dao;
  }

  async getProductos() {
    try {
      return await this.dao.getProductos();
    } catch (error) {
      logger.error("Error al obtener productos:", error);
      throw error;
    }
  }

  async getList(request) {
    try {
      return await this.dao.getList(request);
    } catch (error) {
      logger.error("Error al obtener la lista de productos:", error);
      throw error;
    }
  }

  async getProductoById(id) {
    try {
      return await this.dao.getProductoById(id);
    } catch (error) {
      logger.error("Error al obtener el producto por ID:", error);
      throw error;
    }
  }

  async getChat() {
    try {
      return await this.dao.getChat();
    } catch (error) {
      logger.error("Error al obtener el chat:", error);
      throw error;
    }
  }

  async getCarts() {
    try {
      return await this.dao.getCarts();
    } catch (error) {
      logger.error("Error al obtener los carritos:", error);
      throw error;
    }
  }

  async getCartById(id) {
    try {
      return await this.dao.getCartById(id);
    } catch (error) {
      logger.error("Error al obtener el carrito por ID:", error);
      throw error;
    }
  }

  async getMockProductos() {
    try {
      return await this.dao.getMockProductos();
    } catch (error) {
      logger.error("Error al obtener productos de prueba:", error);
      throw error;
    }
  }
}









// import mongoose from 'mongoose';
// import productsModel from "../DAO/mongo/models/products.models.js";
// import cartsModel from "../DAO/mongo/models/carts.models.js"
// import messagesModel from "../DAO/mongo/models/messages.model.js"; 
// import { generateMock } from "../utils.js"
// import logger from "../middleware/logger/configLogger.js"



// export const getProductos = async () => {
//   try {
//     const products = await productsModel.find().lean().exec();
//     if (!products || products.length === 0) {
//       logger.error("No se encontraron productos en la base de datos.");
//     }
//     return products;
//   } catch (error) {
//     logger.error("Error al obtener productos:", error);
//     throw error;
//   }
// };


// export const getList = async (request) => {
//     let page = parseInt(request.query?.page || 1);
//     let limit = parseInt(request.query?.limit || 10);
//     const queryParams = request.query?.query || '';
//     const sortParam = request.query?.sort || '';
  
//     const query = {};
//     if (queryParams) {
//       const field = queryParams.split(',')[0];
//       let value = queryParams.split(',')[1];
  
//       if (!isNaN(parseInt(value))) value = parseInt(value);
//       query[field] = value;
//     }
  
//     const sort = {};
//     if (sortParam === 'asc' || sortParam === 'desc') {
//       sort['price'] = sortParam === 'asc' ? 1 : -1;
//     }
  
//     const totalDocs = await productsModel.countDocuments(query);
//     const totalPages = Math.ceil(totalDocs / limit);
  
//     if (page > totalPages) {
//       page = totalPages;
//     }
  
//     const result = await productsModel.find(query).sort(sort).skip((page - 1) * limit).limit(limit).lean();
  
//     const hasPrevPage = page > 1;
//     const hasNextPage = page < totalPages;
//     const prevLink = hasPrevPage ? `/list?limit=${limit}&page=${page - 1}` : null;
//     const nextLink = hasNextPage ? `/list?limit=${limit}&page=${page + 1}` : null;
  
//     return {
//       status: 'success',
//       payload: result,
//       totalPages,
//       prevPage: page - 1,
//       nextPage: page + 1,
//       page,
//       hasPrevPage,
//       hasNextPage,
//       prevLink,
//       nextLink
//     };
//   };                  
  
//   export const getProductoById = async (id) => {
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return null;
//     }
//     return await productsModel.findById(id);
//   };
  
//   export const getChat = async () => {
//     return await messagesModel.find().lean().exec();
//   };
  
//   export const getCarts = async () => {
//     return await cartsModel.find().populate('products.products').exec();
//   };
  
//   export const getCartById = async (id) => {
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return null;
//     }
//     return await cartsModel.findById(id).populate('products.products').exec();
//   };

// //no se si guardar en mongo 
//   export const getMockProductos = async () => {
   
//     const mockData = generateMock();
    
//     return mockData;
//   };