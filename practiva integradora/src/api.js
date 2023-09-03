import express from "express";
import __dirname from "utils"
import handlebars from "express-handlebars"




const app = express()



//carpeta publica

app.use("/public", express.static(__dirname + `/public`))


// para traer info de post como JSON

app.use(express.json())

//configurar los motores de plantillas
app.engine(`handlebars`,handlebars.engine())
app.set(`views`, __dirname + `/views`)
app.set(`views engine`,`handlebars`)




app.use("/pokemon",  pokeRouter)
app.get("/", (req, res) => res.send("it work great!!"))


//corrermos el server
const server= app.listen(8080, ()=> console.log("listeng.."))
server.on("error" , e => console.error(e));
