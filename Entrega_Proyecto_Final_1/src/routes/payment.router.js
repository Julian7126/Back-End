import express from "express";
import PaymentServices from "../services/payment.services.js";
import {cartService} from "../services/index.js";


const paymentRouter = express.Router();


paymentRouter.post("/", async (req, res) => {
    console.log("Entró al manejador de la ruta /payment");
    const { cartId } = req.body;


    try {
        const cart = await cartService.findCartById(cartId);


            console.log(cart);

        if (!cart) return res.status(404).json({ error: "No se encontró el carrito" });
        
        if (!cart.products || cart.products.length === 0) {
            return res.status(400).json({ error: "El carrito no tiene productos" });
        }



        const totalAmount = calculateTotalAmount(cart.products);
        const productDescription = cart.products.map(product => product.products.description).join(", ");


        const productIntentInfo = {
            amount: totalAmount * 100,
            currency: "usd",
            description: productDescription,
            payment_method_types: ["card"],
        };

        const service = new PaymentServices(cart);
        const result = await service.createPaymentIntent(productIntentInfo);

        console.log(result);
        res.send({ status: "success", payload: result });


    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

const calculateTotalAmount = (products) => {
    const totalAmount = products.reduce((total, product) => {
        const productTotal = product.quantity * product.products.price;
        console.log(`Product Total: ${productTotal}`);
        return total + productTotal;
    }, 0);
    console.log(`Total Amount: ${totalAmount}`);
    return totalAmount;
};

export default paymentRouter;
