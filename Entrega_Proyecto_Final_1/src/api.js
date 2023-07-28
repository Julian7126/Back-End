import express from 'express';
import productosRouter from './routes/products.router.js';
import cartRouter from "./routes/cart.router.js"
import handlebars from 'express-handlebars';
import http from 'http';
import { Server } from 'socket.io';
import __dirname from './utils.js';
import mongoose from 'mongoose';
import ProductManager from "./dao/services/productManager.js"

const app = express();
const server = http.createServer(app);
const io = new Server(server);


// handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine','handlebars')
app.use(express.json());


//  socket.io



const runServer = () => {
  const httpServer = app.listen(8080, () => console.log('Escuchando...'))
  const io = new Server(httpServer)

  io.on('coneccion ', socket => {
      socket.on('nuevo_producto', async data => {
          const productManager = new ProductManager ()
          await productManager.create(data)

          const products = await ProductManager.list()
          io.emit('reload-table', products)

      })
  })
}
// io.on('connection', (socket) => {
//   console.log('Cliente conectado');

//   // lista de productos a cliente conectado
//   const productos = manager.obtenerProductos();
//   socket.emit('productosActualizados', productos);

//   socket.on('disconnect', () => {
//     console.log('Cliente desconectado');
//   });
// });


app.use("/api/productos", productosRouter);
app.use('/api/carts', cartRouter)
///incorporar el cart
app.get("/", (require, response)=> response.send("esta funcionando bien"))

mongoose.set(`strictQuery`,false)
const URL =  "mongodb+srv://julibischoff:julibischoff@cluster0.5dy77sq.mongodb.net/?retryWrites=true&w=majority";
//corremos el servidor 
mongoose.connect(URL,{
  dbName: "DataBaseEccomerce"
})
  .then(()=>{
     console.log("DB conectada")
    runServer()
     
  })
  .catch(()=>{
    console.log("no se conecto a la base de datos")
  })






export { io };
