import express from 'express';
import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';
import session from 'express-session';
import productosRouter from './routes/products.router.js';
import cartRouter from "./routes/cart.router.js"
import chatRouter from './routes/chat.routes.js';
import handlebars from 'express-handlebars';
import http from 'http';
import { Server } from 'socket.io';
import __dirname from './utils.js';
import messagesModel from './dao/models/messages.model.js';
import viewsRouter from './routes/views.router.js';
import sessionRouter from "./routes/session.router.js"
import initializePassport from "./config/passport.config.js"
import passport from 'passport';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));

//session
const URL = "mongodb+srv://julibischoff:julibischoff@cluster0.5dy77sq.mongodb.net/?retryWrites=true&w=majority";
const dbName = "DataBaseEccomerce";





app.use(session({
  store: MongoStore.create({
    mongoUrl: URL,
    dbName,
    mongoOptions: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  }),
  secret: 'secret', 
  resave: true,
  saveUninitialized: true,
}));

//Passport 
initializePassport()
app.use(passport.initialize())
app.use(passport,session())

// Routes
app.use("/api/productos", productosRouter);
app.use("/api/carts", cartRouter);
app.use("/api/session", sessionRouter);
app.use("/chat", chatRouter);
app.use("/", viewsRouter);

// Socket.IO
const runServer = () => {
  const httpServer = server.listen(8080, () => console.log('Escuchando...'));
  const io = new Server(httpServer);

  io.on('connection', (socket) => {
    console.log('Cliente conectado');

    // chat
    socket.on('nuevo_mensaje', async (data) => {
      try {
        // guardar mensaje en mongo
        await messagesModel.create(data);

        // ahora está incluido el remitente
        socket.emit('nuevo_mensaje', data);
      } catch (error) {
        console.error('Error al guardar el mensaje:', error);
      }
    });

    socket.on('disconnect', () => {
      console.log('Cliente desconectado');
    });
  });
}

// Database connection and server startup
mongoose.set(`strictQuery`, false);
mongoose.connect(URL, {
  dbName: "DataBaseEccomerce"
})
  .then(() => {
    console.log("DB conectada");
    runServer();
  })
  .catch(() => {
    console.log("No se pudo conectar a la base de datos");
  });

export { io };
