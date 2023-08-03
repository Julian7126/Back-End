import express from 'express';
import productsModel from '../dao/models/products.models.js';
const viewsRouter = express.Router();



// viewsRouter.get('/productos', async (request, response) => {
//   const products = await productsModel.find().lean().exec();
//   response.render('home', { products });
// });


viewsRouter.get('/productos', async (request, response) => {
  const products = await productsModel.find().lean().exec();
  response.render('home', { products });
});


viewsRouter.get('/productos/:pid', async (request, response) => {
  const id = request.params.pid;
  const product = await productsModel.findById(id);
  response.render('one', product);
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
