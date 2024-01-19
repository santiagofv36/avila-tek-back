import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import mongoose from "mongoose";
import router from "./router";

// URL de la base de datos, por lo general se guarda en .env, pero por simplicidad se deja aquí
const MONGO_URL =
  "mongodb+srv://santiagofigueroavasquez:paHYk63O8MN07MjZ@cluster1.bagoxrm.mongodb.net/?retryWrites=true&w=majority";

/**
 * Inicia el servidor y lo configura con los middlewares y rutas.
 *
 * @returns {Promise<void>} - Una promesa que resuelve con nada.
 */
async function start(): Promise<void> {
  try {

    // Se crea el servidor
    const app = express();
    const port: number = 3000;

    // Se agregan los middlewares
    app.use(
      cors({
        credentials: true,
      })
    );

    // Se agregan los middlewares
    app.use(compression());
    app.use(cookieParser());
    app.use(bodyParser.json());

    // Se inicia el servidor
    app.listen(port, () => {
      console.log(`Server is listening on port http://localhost:${port}`);
    });

    // Conexión a la base de datos
    await mongoose.connect(MONGO_URL);

    // Se importa el router
    app.use("/api/", router());
  } catch (e) {
    // En caso de error, ya sea por la conexión a la base de datos o por el servidor, se muestra en consola
    console.log(e);
  }
}

start();
