import dotenv from 'dotenv'
dotenv.config()

const config = {
 PORT: process.env.PORT || 5000,
 MONGO_URL: process.env.MONGO_URL,
 SECRET_KEY: process.env.SECRET_KEY,
 dbName: process.env.dbName,
 clientID:process.env.clientID,
 clientSecret:process.env.clientSecret,
 callbackURL:process.env.callbackURL,
 PRIVATE_KEY_TOKEN:process.env.PRIVATE_KEY_TOKEN,
 PRIVATE_KEY_COOKIE:process.env.PRIVATE_KEY_COOKIE,
 persistence: process.env.PERSISTENCE || "MONGO",
 AMBIENTE: process.env.NODE_ENV_PRODUCTION,
 email: process.env.EMAIL,
password: process.env.PASSWORD,
keyStripePrivate: process.env.KEY_STRIPE_PRIVATE,
}

export default config;