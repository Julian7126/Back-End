import express from 'express';
import * as viewController from "../controller/viewsController.js"
import passport from 'passport';
import { isAdmin } from '../middleware/validaciones.js';


const viewsRouter = express.Router();

viewsRouter.get('/list', viewController.getList);
viewsRouter.get('/productos', viewController.getProductos);
viewsRouter.get('/productos/:pid', viewController.getProductoById);
viewsRouter.get("/", viewController.getLogin);
viewsRouter.get("/register", viewController.getRegister);
viewsRouter.get("/profile", viewController.getProfile);
viewsRouter.get('/chat', viewController.getChat); 
viewsRouter.get('/carts', viewController.getCarts);
viewsRouter.get("/carts/:cid", viewController.getCartById);
viewsRouter.get("/mockingproducts", viewController.getMockProductos);
viewsRouter.get("/loggerTest" ,viewController.getLoggerTest) 
viewsRouter.get("/crearProducto" ,viewController.getCrearProducto) 
viewsRouter.get("/listaUsuarios" , isAdmin ,viewController.getListaUsuarios)
viewsRouter.get("/pagado"  ,viewController.getSuccess) 
viewsRouter.get("/cancel"  ,viewController.getCancel)  






//GITHUB

viewsRouter.get(
  `/login-github`,
  passport.authenticate('github', { scope: ['user:email'] }),
  async (request, response) =>{}
)  


viewsRouter.get(
  `/githubcallback`,
  passport.authenticate(`github`, {failureFlash:`/`}),
  async (request, response) =>{
    console.log(`Callback:`, request.user)
    request.session.user = request.user 
    console.log(request.session)
    response.redirect(`/list`)

  }  

)  






export default viewsRouter;



