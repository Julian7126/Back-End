import passport from "passport";
import local from 'passport-local';
import UserModel from "../DAO/mongo/models/user.models.js";
import GitHubStrategy from 'passport-github2';
import { createHash, isValidPassword } from "../utils.js";
import cartsModel from "../DAO/mongo/models/carts.models.js";
import jwt from "passport-jwt";
import config from "./config.js";

// Log para depuración
console.log("SECRET_KEY: ", config.SECRET_KEY);

// Estrategia de JWT
const JWTStrategy = jwt.Strategy;
const ExtractJWT = jwt.ExtractJwt;

// Extracción de cookies
const cookieExtractor = request => {
    const token = (request?.cookies) ? request.cookies[config.PRIVATE_KEY_COOKIE] : null;
    console.log('COOKIE EXTRACTOR: ', token);
    return token;
};

const LocalStrategy = local.Strategy;

const initializePassport = () => {
    passport.use(
        'jwt',
        new JWTStrategy(
            {
                jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
                secretOrKey: config.SECRET_KEY
            },
            async (jwt_payload, done) => {
                try {
                    return done(null, jwt_payload.user);
                } catch (error) {
                    return done(error);
                }
            })
    );

    // Estrategia de GitHub
    passport.use('github', new GitHubStrategy(
        {
            clientID: config.clientID,
            clientSecret: config.clientSecret,
            callbackURL: config.callbackURL,
            scope: ['user:email'],
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const email = profile._json.email || profile.emails[0].value;
                const user = await UserModel.findOne({ email });
                if (user) {
                    return done(null, user);
                }
                const newUser = {
                    name: profile._json.name,
                    email,
                    password: ''
                };
                const result = await UserModel.create(newUser);
                return done(null, result);
            } catch (error) {
                return done('Error to login with GitHub: ' + error);
            }
        }
    ));

    // Estrategia para registrarse
    passport.use('register', new LocalStrategy(
        {
            passReqToCallback: true,
            usernameField: 'email',
        },
        async (req, username, password, done) => {
            try {
                const { first_name, last_name, age, email } = req.body;
                const user = await UserModel.findOne({ email: username });
                if (user) {
                    return done(null, false);
                }
                const newCart = await cartsModel.create({ products: [] });
                const newUser = {
                    first_name,
                    last_name,
                    age,
                    email,
                    cartId: newCart._id,
                    password: createHash(password)
                };
                const result = await UserModel.create(newUser);
                return done(null, result);
            } catch (error) {
                return done('Error to register ' + error);
            }
        }
    ));

    // Estrategia para iniciar sesión
    passport.use('login', new LocalStrategy(
        { usernameField: 'email' },
        async (username, password, done) => {
            try {
                const user = await UserModel.findOne({ email: username }).lean().exec();
                if (!user) {
                    return done(null, false);
                }
                if (!isValidPassword(user, password)) {
                    return done(null, false);
                }
                return done(null, user);
            } catch (error) {
                return done('Error login ' + error);
            }
        }
    ));

    // Serialización
    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    // Deserialización
    passport.deserializeUser(async (id, done) => {
        try {
            const user = await UserModel.findById(id);
            done(null, user);
        } catch (error) {
            done(error, null);
        }
    });
};

export default initializePassport;
