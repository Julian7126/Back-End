import express from 'express';
import MongoStore from 'connect-mongo';
import session from 'express-session';
import productosRouter from './routes/products.router.js';
import cartRouter from "./routes/cart.router.js"
import chatRouter from './routes/chat.routes.js';
import handlebars from 'express-handlebars';
import http from 'http';
import { Server } from 'socket.io';
import __dirname from './utils.js';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUiExrpess from 'swagger-ui-express';


import viewsRouter from './routes/views.router.js';
import sessionRouter from "./routes/session.router.js"
import initializePassport from '../src/config/passport.config.js'
import passport from 'passport';
import cookieParser from 'cookie-parser';
import config from './config/config.js';
import flash from 'connect-flash';
import * as chatController from "./controller/chatController.js";
import ticketRouter from './routes/ticket.router.js';
import compression from 'express-compression';
import errorHandle from "./middleware/error.js"
import { addLogger } from "./middleware/logger/configLogger.js";
import logger from "./middleware/logger/configLogger.js"

import { cpus } from 'os';
// import { logger } from 'handlebars';

console.log(` Esta PC tiene ${cpus().length} procesadores`)

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const swaggerOption ={
  definition:{
    openapi: "3.0.1",
    info : {
      title: " Documentacion API Celulares by Julian Bischoff",
      description: "Este es un proyecto realizado para poder probar las diferentes tecnologias en un ambiente de back"
    }
  },
    apis: [`${__dirname}/docs/**/*.yaml`],
}




// handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

// express
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));



// cookieparser
app.use(cookieParser());
app.use(session({
  store: MongoStore.create({
    mongoUrl: config.MONGO_URL,
    dbName :config.dbName,
    mongoOptions: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  }),
  secret: config.SECRET_KEY, 
  resave: true,
  saveUninitialized: true,
}));

// flash error
app.use(flash());

// Passport 
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

const specs = swaggerJSDoc(swaggerOption)
app.use(`/api/docs`, swaggerUiExrpess.serve, swaggerUiExrpess.setup(specs))
console.log(specs)

// Routes
app.use("/api/productos", productosRouter);
app.use("/api/carts", cartRouter);
app.use("/api/session", sessionRouter);
app.use("/chat", chatRouter);
app.use("/api/ticket", ticketRouter);
app.use("/", viewsRouter);

//custom error
app.use(errorHandle)

//logger
app.use(addLogger) 



app.use(compression({
  brotli: {
    enabled: true,
    zlib: {
    }
  }
}));




const runServer = () => {
  server.listen(config.PORT, ()  => console.log ('Escuchando...'));


  io.on('connection', (socket) => {
    ;
    socket.on('nuevo_mensaje', async (data) => {
      await chatController.addMessage(data, socket);
    });
    socket.on('disconnect', () => {
    });
  });
};

runServer();

export { io };
