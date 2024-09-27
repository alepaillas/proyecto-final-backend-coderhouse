// Importamos el módulo express para crear nuestra aplicación web
import express from "express";
import { initializeMongoDb } from "./config/mongoDb.config.mjs";
import { disconnectMongoDb } from "./config/mongoDb.config.mjs";
import handlebars from "express-handlebars";
import viewRoutes from "./routes/views.routes.mjs";
import session from "express-session";
import MongoStore from "connect-mongo";
import router from "./routes/index.mjs";
import { mongoUri } from "./config/mongoDb.config.mjs";
import passport from "passport";
import initializePassport from "./config/passport.config.mjs";
import cors from "cors";
import cookieParser from "cookie-parser";
import envConfig from "./config/env.config.mjs";
import { errorHandler } from "./errors/errorHandler.mjs";
import swaggerUIExpress from "swagger-ui-express"
import { specs } from "./config/swagger.config.mjs";

// Definimos el puerto en el que se ejecutará el servidor, utilizando el puerto definido en las variables de entorno si está disponible, de lo contrario, utilizamos el puerto 8080 por defecto
const PORT = envConfig.PORT || 8080;
const SESSION_SECRET = envConfig.SESSION_SECRET;

// Conexión con la base de datos
initializeMongoDb();

// Escuchamos señales de la terminal para desconectarnos de MongoDb cuando termine el proceso del servidor
process.on("SIGINT", async () => {
  await disconnectMongoDb();
  process.exit(0); // Exit gracefully
});
process.on("SIGTERM", async () => {
  await disconnectMongoDb();
  process.exit(0); // Exit gracefully
});

// Creamos una nueva instancia de la aplicación express
const app = express();

app.use(cookieParser());

// Middleware para habilitar CORS
// Necesario para auth con GitHub
app.use(cors());

// Para parsear JSON entrante por req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Guardar las sesiones en la base de datos
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: mongoUri,
      //mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true }, // default desde mongo 5
      ttl: 15, // time-to-live en segundos, después de 15s de inactividad se elimina la sesión en la BBDD
    }),
    secret: SESSION_SECRET, // clave para encriptar los datos de sesión
    resave: true, // guarda la sesión incluso si no se ha modificado desde el último request
    // solo crea sesiones que han sido modificadas con un request,
    // es decir solo si se ha interactuado con la página, por ejemplo con un login
    saveUninitialized: false,
    // la cookie no será enviada a terceros
    // es necesario setear esta opción para nuevas versiones de firefox
    cookie: {
      sameSite: "Lax",
    },
  }),
);
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use("/api-docs", swaggerUIExpress.serve, swaggerUIExpress.setup(specs));

// Usamos las rutas
app.use("/api", router);

// iniciamos el motor handlebars
app.engine("handlebars", handlebars.engine());
const viewPath = new URL("./views/", import.meta.url);
app.set("views", viewPath.pathname);
app.set("view engine", "handlebars");
const publicPath = new URL("./public", import.meta.url);
app.use(express.static(publicPath.pathname));

app.use("/", viewRoutes);

app.use(errorHandler);

// Escuchamos las solicitudes en el puerto definido y mostramos un mensaje en la consola cuando el servidor esté listo
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
