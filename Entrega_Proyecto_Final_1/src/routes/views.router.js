import express from 'express';
import productsModel from '../dao/models/products.models.js';
import cartsModel from '../dao/models/carts.models.js';
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
  }//correcion de paginas totales

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
  };
  console.log('Objects:', Objects);

  // datos adicionales
  result.page = page;
  result.limit = limit;
  result.totalPages = totalPages;

  response.render('productosList', result);
});











viewsRouter.get('/productos/:pid', async (request, response) => {
  try {
    const ObjectId = mongoose.Types.ObjectId;
    const id =request.params.pid;


    if (!ObjectId.isValid(id)) {
      return response.status(404).send("Id invalido");
    }
    const products = await productsModel.findById(id);
    if (!products) {
      return response.status(404).send(`no se encuentra el id `);
    }
    response.render('one', { products });
  } catch (error) {
    response.status(404).send('Error');
  }
});

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
    const cid =request.params.cid;
    const cart= await cartsModel.findById(cid).populate('products.products').exec();
    
    if (!cart) {
      return response.status(404).json({ error: "Carrito not found" });
    }
    
    response.render('carts', { cart });
  } catch (e) {
    console.error("Error al obtener el carrito:", e);
    response.status(404).json({ error: "Error al obtener el carrito" });
  }
});





viewsRouter.get("/login", async(request, response) => {
if(request.session?.user) {
  response.redirect("/list")
}

  response.render("login",{})
  
})

viewsRouter.get("/register", async(request, response) => {
  
  if(request.session?.user) {
    response.redirect("/list")
  }
  
    response.render("register",{})
    
 })

 function auth(request , response, next) {
  if(request.session?.user) return next()
  response.redirect("/login")
 }

 
viewsRouter.get("/profile", auth , async (request, response) => {
  const user = request.session.user
  response.render("profile", user)
 
 })

 







export default viewsRouter;



