import {fileURLToPath} from 'url'
import { dirname } from 'path'
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import config from './config/config.js';
import { faker } from "@faker-js/faker/locale/es";


const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)


export const createHash = (password) =>{
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}


export const isValidPassword =(user,password) =>{
    return bcrypt.compareSync(password, user.password)
} 



// JWT Generamos el token
export const generateToken = (user) => {
    const token = jwt.sign( {user}, config.SECRET_KEY , {expiresIn: '24h'})

    return token
}

// JWT Extraemos el token del header

    export const authToken = (req, res, next) => {
        // Buscamos el token en las cookies
        let authHeader = req.cookies[config.PRIVATE_KEY_TOKEN];
        if (!authHeader) {
            return res.status(401).send({
                error: 'Not authorized'
            });
        }

        const token = authHeader;
        jwt.verify(token, config.SECRET_KEY, (error, credentials) => {
            if (error) {
                return res.status(403).send({ error: 'Not authorized' });
            }
    
            req.user = credentials.user;
            next();
        });
};




export const passportCall = strategy => {
    return async(req, res, next) => {
        passport.authenticate(strategy, function(err, user, info) {
            if(err) return next(err)
            if(!user) {
                return res.status(401).send({
                    error: info.messages? info.messages : info.toString()
                })
            }

            req.user = user
            next()
        })(req, res, next)
    }
}



export const authorization = role => {
//aca tambien se cambio req.user --- por req.session.user --- 
    return async(req, res, next) => {
        const user = req.session.user

        if(!user) return res.status(401).send({error: 'Unauthorized'})
        if(user.role != role) return res.status(403).send({error: 'No permission'})

        return next()
    }

}




//MOCK
export const generateMock = () => {
    const numOfProducts = faker.datatype.number({ max: 100 });
    const products = [];

    for (let i = 0; i < numOfProducts; i++) {
        products.push(generateProduct());
    }
    
    return products;
};

const generateProduct = () => {
    return {
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: parseFloat(faker.commerce.price()),
        thumbnail: faker.image.url(),
        code: faker.number.binary(255),
        stock: faker.number.int({ max: 100 }),
    };
};




export default __dirname