// import cartsModel from "../DAO/mongo/models/carts.models.js"
// import productsModel from "../DAO/mongo/models/products.models.js"
// import UserModel from "../DAO/mongo/models/user.models.js"
import chai from "chai"
import mongoose from "mongoose";
import supertest from "supertest";
import logger from "../middleware/logger/configLogger.js"


const expect = chai.expect
const requester = supertest("http://localhost:8080")

 

describe("Testing Session", ()=>{

    describe("Testing Register", ()=>{

    it("En endpoint POST /api/session/register debe registrar un Usuario" , async()=>{
        const userMock = {
            first_name:"ejemplo6",
            last_name: "ejemplo6",
            email:"ejemplo6@gmail.com",
            password: "ejemplo6"

        }
                const response = await requester.post("/api/session/register").send(userMock)
                const {status,ok,_body} = response

                expect(status).to.equal(401);
                expect(_body).to.have.property("_id");



    })


    //problemas con la autentificacion para los tester
     

        it(" En el endpoint POST /api/session/register  NO DEBERIA REGISTRARSE un Usuario VACIO", async()=>{
            const userMock={}
            const response = await requester.post("/api/session/register").send(userMock).set('Authorization', 'CoderKeyFromJulian');
            const {status, ok, _body}= response 

            expect(ok).to.be.eql(false)


        })

    
    })

    describe("Testing Login", () => {
        it("En endpoint POST /api/session/login debe logear un Usuario", async () => {
          const userCredentials = {
            email: "ejemplo6@gmail.com",
            password: "ejemplo6",
          };
      
          const response = await requester
            .post("/api/session/login")
            .send(userCredentials)
            .set('Authorization', 'CoderKeyFromJulian')
  
          expect(response.status).to.equal(302);
          expect(response.body).to.have.property("access_token");

         //console.log(response)- santi para que lo veas
        });
      });
    

      describe("Testing Current", () => {
        it("En endpoint GET /api/session/current debe traer la información de un Usuario", async () => {
          const response = await requester.get("/api/session/current").set('Authorization', 'CoderKeyFromJulian')
      
          expect(response.status).to.equal(200);
          expect(response.body).to.have.property("status").equal("success");
          expect(response.body).to.have.property("payload").to.be.an("object");
          
          const user = response.body.payload; 
          expect(user).to.have.property("first_name"); 
          expect(user).to.have.property("last_name")
          expect(user).to.have.property("email"); 



          
        });
      });
    
})
 
describe("Testing Products create ", () => {
  it("En endpoint POST /api/productos debe crear un producto", async () => {
    
    const productData = {
      title: "Nombre del Producto ejemplo tester",
      description: "Descripción del producto ejemplo tester",
      price: 29.99,
      stock: 100,
      owner: "Maria@gmail.com", 
    };

    const response = await requester
      .post("/api/productos")
      .field('title', productData.title)
      .field('description', productData.description)
      .field('price', productData.price)
      .field('stock', productData.stock)
      .field('owner', productData.owner)
    

    expect(response).to.have.status(200);


  });
  
      describe("Testing Products delete", ()=> { 
        it("En endpoint DELETE /api/productos/:pid debe eliminar un producto existente", async () => {
          const productId = "65307a0609b111aac98363ce";
  
          const response = await requester
            .delete(`/api/productos/${productId}`)
            .set('Authorization', 'CoderKeyFromJulian'); 
      
          expect(response).to.have.status(200);
          expect(response.body).to.have.property('message', 'Producto eliminado con éxito');
      
          
        });
      
        it("En endpoint DELETE /api/productos/:pid debe manejar un producto inexistente", async () => {
         
          const productIdInexistente = "65307a0609b111aac98363cesda";
      
          const response = await requester
            .delete(`/api/productos/${productIdInexistente}`)
            .set('Authorization', 'CoderKeyFromJulian');
      
          expect(response).to.have.status(404);
          expect(response.body).to.have.property('error', 'Producto no encontrado');
      
          
        });
    
  
  });











});
 

describe("Testing Carts", ()=>{
    
})
 

