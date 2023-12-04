import express from "express";
import { cartService, productService } from "../services/index.js";
import Stripe from "stripe";
import config from "../config/config.js";

const stripe = new Stripe(config.keyStripePrivate);
const paymentRouter = express.Router();

const getProductsDetails = async (products) => {
    try {
        const productsWithDetails = await Promise.all(products.map(async (product) => {
            const productDetails = await productService.findProductById(product.products);
            return { ...product.toObject(), productDetails };
        }));
        return productsWithDetails;
    } catch (error) {
        console.error("Error al obtener detalles de productos:", error);
        throw error;
    }
};

paymentRouter.post("/payment-intents", async (req, res) => {
    console.log("Entró al manejador de la ruta /payment");
    const { cartId } = req.body;

    try {
        const cart = await cartService.findCartById(cartId);

        console.log(cart);

        if (!cart) return res.status(404).json({ error: "No se encontró el carrito" });

        if (!cart.products || cart.products.length === 0) {
            return res.status(400).json({ error: "El carrito no tiene productos" });
        }

        const productsWithDetails = await getProductsDetails(cart.products);

        console.log(productsWithDetails);

        const totalAmount = calculateTotalAmount(productsWithDetails);

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: productsWithDetails.map(product => ({
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: product.productDetails.title,
                    },
                    unit_amount: product.productDetails.price * 100,
                },
                quantity: product.quantity,
            })),
            mode:"payment",
            success_url: 'http://localhost:8080/list',
            cancel_url: 'http://localhost:8080/list',
        });

        console.log(session);

        res.status(200).json({ sessionId: session });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error interno del servidor" });
    }

});

const calculateTotalAmount = (products) => {
    const totalAmount = products.reduce((total, product) => {
        const quantity = product.quantity || 0;
        const price = (product.productDetails && product.productDetails.price) || 0;

        const productTotal = quantity * price;
        console.log(`Quantity: ${quantity}, Price: ${price}, Product Total: ${productTotal}`);
        return total + productTotal;
    }, 0);

    console.log(`Total Amount: ${totalAmount}`);
    return totalAmount;
};

export default paymentRouter;
















