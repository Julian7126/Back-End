import express from 'express';
import productsModel from '../dao/models/products.models.js';
const viewsRouter = express.Router();



viewsRouter.get('/productos', async (req, res) => {
  const products = await productsModel.find().lean().exec();
  res.render('home', { products });
});

viewsRouter.get('/productos/:pid', async (req, res) => {
  const id = req.params.pid;
  const product = await productsModel.findById(id);
  res.render('one', product);
});

viewsRouter.get('/chat', async (req, res) => {
  try {
    const messages = await messagesModel.find().lean();
    res.render('chat', { messages });
  } catch (error) {
    console.error('Error al obtener los mensajes:', error);
    res.status(500).send('Error interno del servidor');
  }
});

export default viewsRouter;
