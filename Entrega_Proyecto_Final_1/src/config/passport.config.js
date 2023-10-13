import passport from "passport";
import local from 'passport-local';
import UserModel from "../DAO/mongo/models/user.models.js";
import GitHubStrategy from 'passport-github2';
import { createHash, isValidPassword } from "../utils.js";
import cartsModel from "../DAO/mongo/models/carts.models.js";
import jwt from "passport-jwt";
import config from "./config.js";
import LoginUserDTO from "../DAO/DTO/login-user.dto.js";


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
            passReqToCallback: true
        },
        async (req, accessToken, refreshToken, profile, done) => {
            try {
                const email = profile._json.email || profile.emails[0].value;
                let user = await UserModel.findOne({ email });
                let isNewUser = false;
    
                if (!user) {
                    const newUser = {
                        name: profile._json.name,
                        email,
                        password: ''
                    };
                    user = await UserModel.create(newUser);
                    isNewUser = true;
                }
    
                if (isNewUser) {
                    const token = generateToken(user);
                    req.res.cookie(config.PRIVATE_KEY_COOKIE, token, { maxAge: 24 * 60 * 60 * 1000 });
                }
    
                return done(null, user);
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
                const existingUser = await UserModel.findOne({ email: username });

                if (existingUser) {
                  return done(null, false, { message: 'Usuario ya registrado anteriormente' });
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
        
                const loginUserDTO = new LoginUserDTO({ email: username, password });
                
                const user = await UserModel.findOne({ email: loginUserDTO.email }).lean().exec();
                if (!user) {
                    return done(null, false);
                }
                if (!isValidPassword(user, loginUserDTO.password)) {
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
