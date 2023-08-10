import express from 'express';
import UserModel from '../dao/models/user.models.js';

const sessionRouter = express.Router()

sessionRouter.post("/login", async( request ,response)=>{
    
    const { email , password} = req.body
    const user = await UserModel.findOne({email, password})
    if(!user) return response.redirect("login")

    req.session.user= user 
    
    return response.redirect("/list")
})

sessionRouter.post("/register", async( request ,response)=>{
    const user = request.body
    await UserModel.create(user)
    
    return response.redirect("/login")
})



export default sessionRouter