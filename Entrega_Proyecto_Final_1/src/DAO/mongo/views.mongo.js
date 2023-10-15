import mongoose from 'mongoose';
import productsModel from './models/products.models.js';
import cartsModel from './models/carts.models.js';
import messagesModel from './models/messages.model.js';
import { generateMock } from '../../utils.js';
import logger from '../../middleware/logger/configLogger.js';

export default  class ViewsMongo {
  async getProductos() {
    try {
      const products = await productsModel.find().lean().exec();
      if (!products || products.length === 0) {
        logger.error("No se encontraron productos en la base de datos.");
      }
      return products;
    } catch (error) {
      logger.error("Error al obtener productos:", error);
      throw error;
    }
  }

  async getList(request) {
    let page = parseInt(request.query?.page || 1);
    let limit = parseInt(request.query?.limit || 10);
    const queryParams = request.query?.query || '';
    const sortParam = request.query?.sort || '';

    const query = {};
    if (queryParams) {
      const field = queryParams.split(',')[0];
      let value = queryParams.split(',')[1];

      if (!isNaN(parseInt(value))) value = parseInt(value);
      query[field] = value;
    }

    const sort = {};
    if (sortParam === 'asc' || sortParam === 'desc') {
      sort['price'] = sortParam === 'asc' ? 1 : -1;
    }

    const totalDocs = await productsModel.countDocuments(query);
    const totalPages = Math.ceil(totalDocs / limit);

    if (page > totalPages) {
      page = totalPages;
    }

    const result = await productsModel.find(query).sort(sort).skip((page - 1) * limit).limit(limit).lean();

    const hasPrevPage = page > 1;
    const hasNextPage = page < totalPages;
    const prevLink = hasPrevPage ? `/list?limit=${limit}&page=${page - 1}` : null;
    const nextLink = hasNextPage ? `/list?limit=${limit}&page=${page + 1}` : null;

    return {
      status: 'success',
      payload: result,
      totalPages,
      prevPage: page - 1,
      nextPage: page + 1,
      page,
      hasPrevPage,
      hasNextPage,
      prevLink,
      nextLink
    };
  }

  async getProductoById(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }
    return await productsModel.findById(id);
  }

  async getChat() {
    return await messagesModel.find().lean().exec();
  }

  async getCarts() {
    return await cartsModel.find().populate('products.products').exec();
  }

  async getCartById(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }
    return await cartsModel.findById(id).populate('products.products').exec();
  }

  async getMockProductos() {
    const mockData = generateMock();
    return mockData;
  }
};


