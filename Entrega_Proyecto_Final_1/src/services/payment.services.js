import Stripe from "stripe";
import config from "../config/config.js";

const key = config.keyStripePrivate;

export default class PaymentServices {
    constructor(cart) {
        this.stripe = new Stripe(key);
        this.cart = cart;
    }

    async createPaymentIntent(productIntentInfo) {

        const paymentIntent = await this.stripe.paymentIntents.create({
            amount: productIntentInfo.amount,
            currency: productIntentInfo.currency,
            payment_method_types: ["card"],
        });
        return paymentIntent;
    }

}
