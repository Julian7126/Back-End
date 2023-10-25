
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



