import {Router} from "express"

const router = Router()



//listar pokemon
router.get("/", async (req, res) =>{
    res.render("list", {})
})

//pagina para crear pokemon

///crear Pokemon post

//obtener un pokemon{name}

//borrar pokemon 


export default router