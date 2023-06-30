import express from 'express';
import productRouter from './routes/products.router.js';
import cartRouter from './routes/cart.router.js';

const app = express();
app.use(express.json());

// config
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);

app.listen(8080, () => {
  console.log('activado 8080');
});
