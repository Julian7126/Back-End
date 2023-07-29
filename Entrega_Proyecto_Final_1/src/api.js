import express from 'express';
import mongoose from 'mongoose';
import productosRouter from './routes/products.router.js';
import cartRouter from "./routes/cart.router.js"
import chatRouter from './routes/chat.routes.js';
import handlebars from 'express-handlebars';
import http from 'http';
import { Server } from 'socket.io';
import __dirname from './utils.js';
import messagesModel from './dao/models/messages.model.js';



const app = express();
const server = http.createServer(app);
const io = new Server(server);

// handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine','handlebars')
app.use(express.json());

app.use(express.static(__dirname + '/public'))








const runServer = () => {
  const httpServer = app.listen(8080, () => console.log('Escuchando...'))
  const io = new Server(httpServer)

  io.on('connection', (socket) => {
    console.log('Cliente conectado');
  
    // chat
    socket.on('nuevo_mensaje', async (data) => {
      try {
       //guardar mensaje en mongo
        await messagesModel.create(data);
  
        // Emitir el mensaje a todos los demás clientes conectados, excluyendo al remitente
        socket.broadcast.emit('nuevo_mensaje', data);
      } catch (error) {
        console.error('Error al guardar el mensaje:', error);
      }
    });
  
    socket.on('disconnect', () => {
      console.log('Cliente desconectado');
    });
  });
}

app.use("/api/productos", productosRouter);
app.use('/api/carts', cartRouter)
app.use("/chat",chatRouter )
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
