import express from 'express';
import productosRouter from './routes/products.router.js';
import cartRouter from './routes/cart.router.js';
import handlebars from 'express-handlebars';
import http from 'http';
import { Server } from 'socket.io';
import ProductManager from './services/productManager.js';
import __dirname from './utils.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const manager = new ProductManager("productos.json");

// handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine','handlebars')
app.use(express.json());

//  socket.io
io.on('connection', (socket) => {
  console.log('Cliente conectado');

  // lista de productos a cliente conectado
  const productos = manager.obtenerProductos();
  socket.emit('productosActualizados', productos);

  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

// ruta para la vista home.handlebars
app.get('/', (req, res) => {
  const productos = manager.obtenerProductos();
  res.render('home', { productos });
});

// ruta para la vista realTimeProducts.handlebars
app.get('/realtimeproducts', (req, res) => {
  const productos = manager.obtenerProductos();
  res.render('realTimeProducts', { productos });
});

server.listen(8080, () => {
  console.log('Activando servidor en el puerto 8080');
});

export { io };
