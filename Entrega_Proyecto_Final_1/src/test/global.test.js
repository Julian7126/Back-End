// import cartsModel from "../DAO/mongo/models/carts.models.js"
// import productsModel from "../DAO/mongo/models/products.models.js"
// import UserModel from "../DAO/mongo/models/user.models.js"
import chai from "chai";
import mongoose from "mongoose";
import supertest from "supertest";

const expect = chai.expect;
const requester = supertest("http://localhost:8080");

describe("Users", () => {
  let userId;

  const TokenJulian =
    "CoderCookieJulian=CoderCookieJulian=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY1MTRlZTczMTYwOGUwNjBiZTI3ODdjMCIsImZpcnN0X25hbWUiOiJzYW50aSIsImxhc3RfbmFtZSI6InNhbnRpIiwiYWdlIjoyMCwiZW1haWwiOiJzYW50aUBleGFtcGxlLmCnvbSIsImNhcnRJZCI6IjY1MTRlZTcyMTYwOGUwNjBiZTI3ODdiZSIsInBhc3N3b3JkIjoiJDJiJDEwJGsyREtteWdMOVhiNzA1YTlzbE5XNE9MWk1YNDBXbm53c1dCMjl5zRPeGFkeFFxN1Fya09XIiwicm9sZSI6ImFkbWluIiwiX192IjowfSwiaWF0IjoxNjk4NDY5NzU0LCJleHAiOjE2OTg1NTYxNTR9.-nNTLOH-L5fZ9NhQt2g4DOH0wIZdZ0rMIhAFAQoBAfI; Path=/; Expires=Sun, 29 Dic 2023 05:09:13 GMT;";

  describe("Register user", () => {
    it("En endpoint POST /api/session/register debe registrar un Usuario", (done) => {
      const userMock = {
        "first_name": "julian",
        "last_name": "julian",
        "age": 20,
        "email": "mocktest@example.com",
        "password": "julianapp",
        "cartId": "651a32eb598b0114a519f425",
      };

      requester
        .post("/api/session/register")
        .send(userMock)
        .end((err, res) => {
          if (err) done(err);

          expect(res.status).to.equal(200);
          userId = res.body.user._id;
          done();
        });
    }).timeout(4000);

    it("En el endpoint POST /api/session/register NO DEBERÍA REGISTRARSE un Usuario VACÍO", (done) => {
      const userMock = {};
      requester
        .post("/api/session/register")
        .send(userMock)
        .set("Authorization", TokenJulian)
        .end((err, res) => {
          if (err) done(err);

          expect(res.ok).to.equal(false);
          done();
        });
    });
  });

  describe("Login User", () => {
    it("En endpoint POST /api/session/login debe logear un Usuario", async () => {
      const userCredentials = {
        email: "ejemplo6@gmail.com",
        password: "ejemplo6",
      };

      const response = await requester
        .post("/api/session/login")
        .send(userCredentials)
        .set("Authorization", TokenJulian);

      expect(response.status).to.equal(200);
      expect(response.body).to.have.property("access_token");
      expect(response.body).to.have.property("user");
    });
  });

  describe("User Current", () => {
    it("Ver la información del usuario", (done) => {
      requester
        .get("/api/session/current")
        .set("Authorization", TokenJulian)
        .then((res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property("status").equal("success");
          expect(res.body).to.have.property("payload").to.be.an("object");

          const user = res.body.payload;
          expect(user).to.have.property("first_name");
          expect(user).to.have.property("last_name");
          expect(user).to.have.property("email");

          done();
        })
        .catch((err) => {
          done(err);
        });
    });
  });

  describe("Delete User", () => {
    it("En endpoint DELETE /api/session/delete/:id debe eliminar un Usuario", (done) => {
      if (!userId) {
        done("El userId no está definido.");
        return;
      }

      requester
        .delete(`/api/session/delete/${userId}`)
        .set("Authorization", TokenJulian)
        .end((err, res) => {
          if (err) done(err);

          expect(res.status).to.equal(200);
          expect(res.body).to.have.property("message").equal("Usuario eliminado con éxito");

          done();
        });
    }).timeout(2000);
  });
});

 
describe("Testing Products create ", () => {
  const TokenJulian = "CoderCookieJulian=CoderCookieJulian=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY1MTRlZTczMTYwOGUwNjBiZTI3ODdjMCIsImZpcnN0X25hbWUiOiJzYW50aSIsImxhc3RfbmFtZSI6InNhbnRpIiwiYWdlIjoyMCwiZW1haWwiOiJzYW50aUBleGFtcGxlLmNvbSIsImNhcnRJZCI6IjY1MTRlZTcyMTYwOGUwNjBiZTI3ODdiZSIsInBhc3N3b3JkIjoiJDJiJDEwJGsyREtteWdMOVhiNzA1YTlzbE5XNE9MWk1YNDBXbm53c1dCMjl5ZzRPeGFkeFFxN1Fya09XIiwicm9sZSI6ImFkbWluIiwiX192IjowfSwiaWF0IjoxNjk4NDY5NzU0LCJleHAiOjE2OTg1NTYxNTR9.-nNTLOH-L5fZ9NhQt2g4DOH0wIZdZ0rMIhAFAQoBAfI; Path=/; Expires=Sun, 29 Dic 2023 05:09:13 GMT;";



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
            .set('Authorization',TokenJulian ); 
      
          expect(response).to.have.status(200);
          expect(response.body).to.have.property('message', 'Producto eliminado con éxito');
      
          
        });
      
        it("En endpoint DELETE /api/productos/:pid debe manejar un producto inexistente", async () => {
         
          const productIdInexistente = "65307a0609b111aac98363cesda";
      
          const response = await requester
            .delete(`/api/productos/${productIdInexistente}`)
            .set('Authorization',TokenJulian);
      
          expect(response).to.have.status(404);
          expect(response.body).to.have.property('error', 'Producto no encontrado');
      
          
        });
    
  
  });

});
 
 