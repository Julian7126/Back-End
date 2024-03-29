import { sessionService, viewsService } from "../services/index.js";
import  logger  from "../middleware/logger/configLogger.js"




export const getProductos = async (req, res, next) => {
  try {
    const products = await viewsService.getProductos();
    logger.info("Productos obtenidos:", products); 
    res.render('home', { products });
  } catch (err) {
    next(err)
  }
};



export const getList = async (req, res,) => {
  const result = await viewsService.getList(req.query);
  const user = req.user;

  if (req.user) {
    result.user = user.toObject();
  }

  res.render('productosList', { ...result });
}; 

export const getProductoById = async (req, res ,next ) => {
  const product = await viewsService.getProductoById(req.params.pid);
  if (product) {
    res.render('one', product.toObject());
  } else {
    res.status(404).send(`No se encuentra el producto`);
  }
};

export const getChat = async (req, res,) => {
  const messages = await viewsService.getChat();
  const user = req.user;
  res.render('chat', { messages , user });
};

export const getCarts = async (req, res, ) => {
  const result = await viewsService.getCarts();
  res.render('carts', { result });
};

export const getCartById = async (req, res, ) => {
  const cart = await viewsService.getCartById(req.params.cid);
  const user = req.user;
  if (cart) {

    logger.info(cart)
    res.render('carts', { cart: cart.toObject(), user });
  } else {
    res.status(404).send("Carrito no encontrado");
  }
};

export const getLogin = (req, res) => {
  res.render("login", {});
};

export const getRegister = (req, res) => {
  const errorMessage = req.flash('error')[0];
  res.render("register", { errorMessage });
};

export const getProfile = (req, res) => {
  logger.info("Usuario de la sesión:", req.session.user);
  const user = req.session.user;
  res.render("profile", user);
};


export const getCrearProducto = (req, res) => {
  const user = req.user;
  console.log(user)
  res.render('crearProducto', { user });
}

export const getListaUsuarios = async (req, res, next) => {
  try {
    const users = await sessionService.getAllUser();
    console.log(users)
  
    const usersWithoutPrototype = users.map(user => user.toObject({ getters: true }));

    res.render('listaUsuarios', { users: usersWithoutPrototype });
  } catch (err) {
    next(err);
  }
}



export const getSuccess = (req, res, next) => {
try {
  const result= req.body
  res.render('pagado', { result });
} catch (error) {
  next(error)
  
}
}


export const getCancel = (req, res, next) => {
  try {
    const result= req.body
    res.render('cancel', { result });
  } catch (error) {
    next(error)
    
  }
  }




//MOCK
export const getMockProductos = async (req, res, next) => {
  try {
    const productsMock = await viewsService.getMockProductos();
    console.log("Productos obtenidos del Mock:", productsMock);
    res.render('mock', { products: productsMock });
  } catch (error) {
   next(err)
  }
};


export const getLoggerTest = async (req, res , next) =>{
 try {
  logger.debug('para depuracion');
  logger.http('htpp');
  logger.info('informacion');
  logger.error('error');
  logger.fatal('fatal');
  res.send('Mandamo los logs');
 } catch (err) {
  next(err)
 }


}