## API de Comercio Electrónico con Autenticación, Chat y Carrito de Compras
## Este proyecto es una API que implementa el patrón de arquitectura MVC (Modelo-Vista-Controlador) y utiliza los patrones de diseño DAO y DTO. Ofrece funcionalidades de comercio electrónico, incluyendo autenticación, chat en tiempo real y gestión de carrito de compras.

 ## Tecnologías y Librerías Implementadas
- **Express:** Servidor web y enrutamiento.
- **Mongoose:** Modelado de datos con MongoDB.
- **Socket.io:** Funcionalidades en tiempo real, como el chat.
- **Passport:** Autenticación.
- **JWT:** Manejo de tokens de autenticación.
- **Connect-Mongo:** Almacenamiento de sesiones en MongoDB.
- **Express-Session:** Manejo de sesiones.
- Otras librerías como bcrypt, cookie-parser, dotenv, entre otras.

Documentación
La documentación detallada del proyecto se encuentra en el directorio /docs. Incluye información sobre las rutas de la API, modelos de datos, y cómo utilizar las diferentes funcionalidades.

Para más detalles, visita el repositorio en GitHub.

## Variables de Entorno
Dentro del proyecto encontrarás un archivo .env.sample. Crea tu propio archivo .env con las variables detalladas para configurar correctamente el proyecto.


## Instalación

Instalación
Clona el repositorio:

git clone https://github.com/Julian7126/Back-End/tree/master/Entrega_Proyecto_Final_1

Instala las dependencias:
cd Entrega_Proyecto_Final_1
npm install


## Crea un archivo .env en la raíz del proyecto y agrega tus variables de entorno.

Ejecuta el proyecto:
npm start




Cómo Usar
Realiza el login o regístrate para crear tu propio usuario.
Explora las rutas, como /list (home) y /current (perfil).
Para ver todos los productos: GET /api/productos.
Añadir un nuevo producto: POST /api/productos.
Autenticación: POST /api/session.
Accede al chat en tiempo real en /chat.




Contribuciones
Haz un "Fork" del proyecto.
Crea tu "Feature Branch" (git checkout -b feature/NuevaFuncionalidad).
Realiza commits de tus cambios (git commit -m 'Añadiendo nueva funcionalidad').
Haz "Push" a tu Branch (git push origin feature/NuevaFuncionalidad).
Abre un "Pull Request".
Licencia
ISC

Autor: Julian Bischoff

Documentación Disponible - Consulta el directorio /docs para acceder a la documentación detallada del proyecto.

Otras Librerías Utilizadas

Además de las tecnologías mencionadas, el proyecto utiliza otras librerías como @faker-js/faker, aos, bootstrap, winston, entre otras. Puedes revisar el archivo package.json para obtener una lista completa de dependencias y versiones.
