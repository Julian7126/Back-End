import {fileURLToPath} from 'url'
import { dirname } from 'path'
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const PRIVATE_KEY ="CoderKeyFromJulian"


export const createHash = (password) =>{
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}


export const isValidPassword =(user,password) =>{
    return bcrypt.compareSync(password, user.password) // true o false
} 



 //VERSION ANTIGUA DE TOKEN
// //generamos el token
// export const generateToken = (user) =>{
//     const token = jwt.sing ( {user}, PRIVATE_KEY, {expiresIn: `24h`})

//     return token
// }


// //extraemos el token
// export const authToken = (req, res, next) => {

//     if(!authHeader){
//         return res.status(401).send({
//             error: "No auth"
//         })
//     }

//     const token = authHeader
//     jwt.verify(token, PRIVATE_KEY, (error , credentials)=> {
//         if(error) return res.status(403).send({error: "Not authorized"})

//         req.user = credentials.user
//         next()
//     })



// }


// JWT Generamos el token
export const generateToken = (user) => {
    const token = jwt.sign( {user}, PRIVATE_KEY, {expiresIn: '24h'})

    return token
}

// JWT Extraemos el token del header
export const authToken = (req, res, next) => {

    // Buscamos el token en el header o en la cookie
    let authHeader = req.headers.auth
    if(!authHeader) {
      authHeader = req.cookies['coderToken'] 
      if(!authHeader) {
        return res.status(401).send({
            error: 'Not auth'
        })
      }
    }

    // Verificamos y desencriptamos la informacion 
    const token = authHeader
    jwt.verify(token, PRIVATE_KEY, (error, credentials) => {
        if(error) return res.status(403).send({error: 'Not authroized'})

        req.user = credentials.user
        next()
    })
}



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


export default __dirname