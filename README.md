# API ** 
# Entrega_Proyecto_Final_1

## Descripción ** 
# PATRON MVC arquitectura (Modelo-Vista-Controlador) es un patrón en el diseño de software comúnmente utilizado para implementar interfaces de usuario, datos y lógica de control
# PATRON DE DISEÑO // DAO , DTO 


Este proyecto es una API de comercio electrónico con autenticación, chat y funcionalidades de carrito de compras.

## Tecnologías y librerías implementadas


- [Express](https://expressjs.com/es/) para el servidor web y el routing.
- [Mongoose](https://mongoosejs.com/) para modelado de datos con MongoDB.
- [Socket.io](https://socket.io/) para funcionalidades en tiempo real como el chat.
- [Passport](http://www.passportjs.org/) para autenticación.
- [JWT](https://jwt.io/) para manejar tokens de autenticación.
- [Connect-Mongo](https://www.npmjs.com/package/connect-mongo) para almacenar sesiones en MongoDB.
- [Express-Session](https://www.npmjs.com/package/express-session) para manejar sesiones.
- connect-mongo
- express-session
- express-handlebars
- passport (con estrategias GitHub y JWT)
- cookie-parser
- dotenv
- bcrypt

## Requisitos Previos

- Node.js
- MongoDB


## Estructura del proyecto

- `src/` - Contiene el código fuente principal del proyecto.
  - `routes/` - Rutas de la aplicación.
  - `dao/` - Capa de acceso a la base de datos.
  - `config/` - Configuración general y variables de entorno.
- `public/` - Archivos estáticos como imágenes, CSS, y JS.

  

Para más detalles, visite el directorio del proyecto en [GitHub](https://github.com/Julian7126/Back-End/tree/master/Entrega_Proyecto_Final_1).

**** variables de entorno:
Dentro de el Proyecto encontrara un .env.sample
debe usar sus proprias variables de entorno que dejo detalladas// 

Creacion de Basa de datos en mongoAtlas
para conectar base de datos 

## Instalación

1. Clone el repositorio:
    ```sh
    git clone https://github.com/Julian7126/Back-End/tree/master/Entrega_Proyecto_Final_1
    ```

2. Instale las dependencias:
    ```sh
    cd Entrega_Proyecto_Final_1
    npm install
    ```

3. Cree un archivo `.env` en la raíz del proyecto y agregue sus variables de entorno.

4. Ejecute el proyecto:
    ```sh
    npm start
    ```

## Cómo usar

1. LOGIN O REGISTER(CREA TU PROPIO USUARIO)
2. home (/list)
3. profile (/current) 
5. Para ver todos los productos: `GET /api/productos`
6. Para añadir un nuevo producto: `POST /api/productos`
7. Para la autenticación: `POST /api/session`
8. Chat en tiempo real disponible en `/chat`

## Contribuciones


Haz un "Fork" del proyecto
Crea tu Feature Branch (git checkout -b feature/NuevaFuncionalidad)
Haz commit de tus cambios (git commit -m 'Añadiendo alguna nueva funcionalidad')
Haz "Push" a tu Branch (git push origin feature/NuevaFuncionalidad)
Abre un "Pull Request"

## Licencia

ISC

*Autor
JULIAN BISCHOFF

