import mongoose from 'mongoose';
import productsModel from "../DAO/mongo/models/products.models.js";
import cartsModel from "../DAO/mongo/models/carts.models.js"
import messagesModel from "../DAO/mongo/models/messages.model.js";  






export const getProductos = async () => {
    return await productsModel.find().lean().exec();
  };
  
export const getList = async (request) => {
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
  };
  
  export const getProductoById = async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }
    return await productsModel.findById(id);
  };
  
  export const getChat = async () => {
    return await messagesModel.find().lean().exec();
  };
  
  export const getCarts = async () => {
    return await cartsModel.find().populate('products.products').exec();
  };
  
  export const getCartById = async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }
    return await cartsModel.findById(id).populate('products.products').exec();
  };