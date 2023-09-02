import passport from "passport";
import local from 'passport-local'
import UserModel from "../dao/models/user.models.js";
import GitHubStrategy from 'passport-github2'
import { createHash, isValidPassword } from "../utils.js";
import jwt from "passport-jwt"
import dotenv from 'dotenv';
dotenv.config();

/**
 * 
 * 
*App ID: 375542

Client ID: Iv1.34c8634720befa98
 *  Secret: 11127051ef8270bfe0ae417d56081dba44f1d19b
*/



dotenv.config();
const secretKeyTokenJwt = process.env.PRIVATE_KEY;
const JWTStrategy = jwt.Strategy // La estrategia de JWT
const ExtractJWT = jwt.ExtractJwt // La funcion de extraccion


const cookieExtractor = request => {
    const token = (request?.cookies) ? request.cookies['CoderCookieJulian'] : null
    
    console.log('COOKIE EXTRACTOR: ', token)
    return token
}





const LocalStrategy = local.Strategy

const initializePassport = () => {

    passport.use(
        'jwt',
        new JWTStrategy(
            {
                jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]), // aca se puede agregar mas extractores como el headear cookieExtractor : headear
                secretOrKey: secretKeyTokenJwt
            },
            async (jwt_payload, done) => {

                try {
                    return done(null, jwt_payload.user)
                } catch (e) {
                    return done(e)
                }
            })
    )




    passport.use('github', new GitHubStrategy(
        {
            clientID: 'Iv1.34c8634720befa98',
            clientSecret: '11127051ef8270bfe0ae417d56081dba44f1d19b',
            callbackURL: 'http://localhost:8080/githubcallback',
            scope: ['user:email'] ,
        },
        async (accessToken, refreshToken, profile, done) => {
            console.log(profile)
            const email = profile._json.email || profile.emails[0].value
            
            try  {
                const user = await UserModel.findOne({email});
                if(user) {
                    console.log('User already exists ' + email);
                    return done(null, user);
                }

                const newUser = {
                    name: profile._json.name,
                    email,
                    password: ''
                };
                const result = await UserModel.create(newUser);
                return done(null, result);
            } catch(e) {
                return done('Error to login with GitHub: ' + e);
            }
        }
    ));


    // register Es el nomber para Registrar con Local
    passport.use('register', new LocalStrategy(
        {
            passReqToCallback: true,
            usernameField: 'email'
        },
        async (req, username, password, done) => {
            const { first_name , last_name, age , email } = req.body
            try {
                const user = await UserModel.findOne({ email: username })
                if (user) {
                    console.log('User already exits')
                    return done(null, false)
                }

                const newUser = {
                    first_name,
                    last_name,
                    email,
                    password: createHash(password)
                }
                const result = await UserModel.create(newUser)
                return done(null, result)
            } catch (error) {
                return done('Error to register ' + error)
            }
        }
    ))
    // login Es el nomber para IniciarSesion con Local
    passport.use('login', new LocalStrategy(
        { usernameField: 'email' },
        async (username, password, done) => {
            try {
                const user = await UserModel.findOne({ email: username }).lean().exec()
                if (!user) {
                    console.error('User doesnt exist')
                    return done(null, false)
                }

                if (!isValidPassword(user, password)) {
                    console.error('Password not valid')
                    return done(null, false)
                }

                return done(null, user)
            } catch (e) {
                return done('Error login ' + error)
            }
        }
    ))

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done) => {
        const user = await UserModel.findById(id)
        done(null, user)
    })


    


}
export default initializePassport



