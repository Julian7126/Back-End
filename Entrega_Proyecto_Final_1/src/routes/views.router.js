import express from 'express';
import productsModel from '../dao/models/products.models.js';
import cartsModel from '../dao/models/carts.models.js';
const viewsRouter = express.Router();



viewsRouter.get('/productos', async (request, response) => {
  const products = await productsModel.find().lean().exec();
  response.render('home', { products });
});


viewsRouter.get('/list', async (request, response) => {
  let page = parseInt(request.query?.page || 1);
  let limit = parseInt(request.query?.limit || 10);
  const queryParams = request.query?.query || ``;
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
  }//correcion de paginas totales

  const result = await productsModel.paginate(query, {
    page,
    limit,
    lean: true,
    sort,
  });

  // datos adicionales
  result.page = page;
  result.limit = limit;
  result.totalPages = totalPages;

  response.render('productosList', result);
});










//aca arreglarrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr
viewsRouter.get('/productos/:pid', async (request, response) => {
  try {
    const id =request.params.pid;
    const products = await productsModel.findById(id);
    if (!products) {
      return response.status(404).send(`no se encuentra el id `);
    }
    response.render('one', { products });
  } catch (error) {
    response.status(404).send('Error');
  }
});

viewsRouter.get('/chat', async (request, response) => {
  try {
    const messages = await messagesModel.find().lean();
    response.render('chat', { messages });
  } catch (error) {
    console.error('Error datos:', error);
    response.status(404).send('Error  del servidor');
  }
});






// Obtener todos los carritos de compras
viewsRouter.get("/carts", async (request, response) => {
  try {
    const result = await cartsModel.find().lean().exec();
    response.render('carts', { result });
  } catch (e) {
    response.status(404).json({ error: "No se pudo obtener la lista de carritos" });
  }
});

// Obtener un carrito por su ID
viewsRouter.get("/carts/:cid", async (request, response) => {
  try {
    const cid = +request.params.cid;
    const cart = await cartsModel.findById(cid);
    
    if (!cart) {
      return response.status(404).json({ error: "Carrito not found" });
    }
    
    response.render('carts', { cart });
  } catch (e) {
    response.status(404).json({ error: "Error al obtener el carrito" });
  }
});

export default viewsRouter;