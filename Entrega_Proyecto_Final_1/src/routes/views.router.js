import express from 'express';
import mongoose from 'mongoose';
import productsModel from '../models/products.models.js';
import cartsModel from '../models/carts.models.js';
import passport from "passport";
const viewsRouter = express.Router();



viewsRouter.get('/productos', async (request, response) => {
  const products = await productsModel.find().lean().exec();
  response.render('home', { products });
});


viewsRouter.get('/list', async (request, response) => {
  let page = parseInt(request.query?.page || 1);
  let limit = parseInt(request.query?.limit || 10);
  const queryParams = request.query?.query || ``;
  const sortParam = request.query?.sort || '';

  const query = {};
  if (queryParams) {
    const field = queryParams.split(',')[0];
    let value = queryParams.split(',')[1];

    if (!isNaN(parseInt(value))) value = parseInt(value);
    query[field] = value;
  }

  const sort = {};
  if (sortParam === 'asc' || sortParam === 'desc') {
    sort['price'] = sortParam === 'asc' ? 1 : -1;
  }

  const totalDocs = await productsModel.countDocuments(query);
  const totalPages = Math.ceil(totalDocs / limit);

  if (page > totalPages) {
    page = totalPages;
  }

  const result = await productsModel.paginate(query, {
    page,
    limit,
    lean: true,
    sort,
  });

  const hasPrevPage = page > 1;
  const hasNextPage = page < totalPages;
  const prevLink = hasPrevPage ? `/list?limit=${limit}&page=${page - 1}` : null;
  const nextLink = hasNextPage ? `/list?limit=${limit}&page=${page + 1}` : null;
  const user = request.session.user;


  const Objects = {
    status: 'success',
    payload: result.docs,
    totalPages,
    prevPage: page - 1,
    nextPage: page + 1,
    page,
    hasPrevPage,
    hasNextPage,
    prevLink,
    nextLink,
    user: user,
  };

  // datos adicionales
  result.page = page;
  result.limit = limit;
  result.totalPages = totalPages;

  
  response.render('productosList', { ...Objects, ...result });
});


viewsRouter.get('/productos/:pid', async (request, response) => {
  try {
    const ObjectId = mongoose.Types.ObjectId;
    const id = request.params.pid;

    console.log('ID del producto:', id);

    if (!ObjectId.isValid(id)) {
      console.log('ID inválido:', id);
      return response.status(404).send("Id inválido");
    }

    const product = await productsModel.findById(id);

    if (!product) {
      console.log('Producto no encontrado para el ID:', id);
      return response.status(404).send(`No se encuentra el producto`);
    }

    console.log('Producto encontrado:', product);

    // Renderizar la vista con el producto
    response.render("one", product.toObject() );


  } catch (error) {
    console.error('Error en la ruta de productos:', error);
    response.status(500).send('Error interno del servidor');
  }
});


//CHAT

viewsRouter.get('/chat', async (request, response) => {
  try {
    const messages = await messagesModel.find().lean();
    response.render('chat', { messages });
  } catch (error) {
    console.error('Error datos:', error);
    response.status(404).send('Error  del servidor');
  }
});



// Obtener todos los carritos de compras
viewsRouter.get("/carts", async (request, response) => {
  try {
    const result = await cartsModel.find().populate('products.products').exec();
    response.render('carts', { result });
  } catch (e) {
    response.status(404).json({ error: "No se pudo obtener la lista de carritos" });
  }
});

// Obtener un carrito por su ID
viewsRouter.get("/carts/:cid", async (request, response) => {
  try {

    //correccion de santi
    const cid =request.params.cid;

    let cart= await cartsModel.findById(cid).populate('products.products').exec();
   
  
   
    if (!cart) {
   
     return response.status(404).json({ error: "Carrito not found" });
   
    }
   
    cart = cart.toObject();
   
    response.render('carts', { cart: cart });

  } catch (e) {
    console.error("Error al obtener el carrito:", e);
    response.status(404).json({ error: "Error al obtener el carrito" });
  }
});



//Sesiones -

viewsRouter.get("/",  async(request, response) => {
if(request.session?.user) {
  response.redirect("/list")
}

  response.render("login",{})
  
})

viewsRouter.get("/register", async(request, response) => {
  
  if(request.session?.user) {
    response.redirect("/list")
  }
  
  const errorMessage = request.flash('error')[0]; // no me esta funcionando este mensaje de usuario ya registrado 
  response.render("register", { errorMessage });
 })

 function auth(request , response, next) {
  if(request.session?.user) return next()
  response.redirect("/login")
 }

 
viewsRouter.get("/profile", auth , async (request, response) => {
  const user = request.session.user
  response.render("profile", user)
 
 })

 
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



