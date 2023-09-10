import express from 'express';
import * as viewController from "../controller/viewsController.js"
import passport from 'passport';


const viewsRouter = express.Router();

viewsRouter.get('/productos', viewController.getProductos);
viewsRouter.get('/productos/:pid', viewController.getProductoById);
viewsRouter.get('/chat', viewController.getChat);
viewsRouter.get("/carts/:cid", viewController.getCartById);
viewsRouter.get("/", viewController.getLogin);
viewsRouter.get("/register", viewController.getRegister);
viewsRouter.get("/profile", viewController.getProfile);
// viewsRouter.get("/carts", viewController.getAllCarts);
// viewsRouter.get('/list', viewController.getProductosList);

 
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



