import express from "express";

const app= express()

const products = []


app.get(`/api/product`, (req, res)=>{
    
    res.json(products)
})

app.post(`/api/product`,(req, res)=>{
    const product = req.body

    products.push(product)
    res.status(201).json({status:`success`, message :`Product Created`})

})


app.listen(8080);