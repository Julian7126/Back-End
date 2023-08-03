import express from 'express';
import productsModel from '../dao/models/products.models.js';
const viewsRouter = express.Router();



viewsRouter.get('/productos', async (request, response) => {
  const products = await productsModel.find().lean().exec();
  response.render('home', { products });
});


viewsRouter.get('/list', async (request, response) => {
  const result = await productsModel.paginate({},{
    page: 1,
    limit: 10,
    lean:true,
  });
  response.render('productosList', result);
});


viewsRouter.get('/productos/:pid', async (request, response) => {
  try {
    const id = request.params.pid;
    const product = await productsModel.findById(id);
    if (!product) {
      return response.status(404).send(`no se encuentra el id `);
    }
    response.render('one', { product });
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

export default viewsRouter;
