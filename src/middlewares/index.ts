import express from "express";
import { getUserBySessionToken } from "../actions/user-actions";


/**
 * Middleware que verifica si el usuario está autenticado basado en el token de sesión de las cookies de la solicitud.
 * 
 * @param {express.Request} req - Objeto de solicitud de Express.
 * @param {express.Response} res - Objeto de respuesta de Express.
 * @param {express.NextFunction} next - Función de siguiente paso de Express.
 * @returns {Promise<void>} - Una promesa que resuelve con un objeto de respuesta de Express.
 */
export const isAuthenticated = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {

  // Esta función no se utilizó en el proyecto, pero se deja como ejemplo de como se puede verificar si el usuario esta autenticado y proteger las rutas

  try {
    const sessionToken = req.cookies["sessionToken"];

    if (!sessionToken) {
      return res.status(401).send("Unauthorized");
    }

    const user = await getUserBySessionToken(sessionToken);

    if (!user) {
      return res.status(401).send("Unauthorized");
    }
    // Una vez que se ha verificado que el usuario esta autenticado, se pasa a la siguiente función
    
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal server error");
  }
};
