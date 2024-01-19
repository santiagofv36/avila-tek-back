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

async function start() {
  try {
    const app = express();
    const port : number = 3000;

    app.use(
      cors({
        credentials: true,
      })
    );

    app.use(compression());
    app.use(cookieParser());
    app.use(bodyParser.json());

    app.listen(port, () => {
      console.log(`Server is listening on port http://localhost:${port}`);
    });

    // Conexión a la base de datos
    await mongoose.connect(MONGO_URL);

    // Se importa el router
    app.use("/", router())

  } catch (e) {
    // En caso de error, ya sea por la conexión a la base de datos o por el servidor, se muestra en consola
    console.log(e);
  }
}

start();
