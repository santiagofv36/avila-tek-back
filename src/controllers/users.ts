import express from "express";

import { getUserBySessionToken } from "../actions/user-actions";

/**
 * Obtiene todos los usuarios de la base de datos con paginación.
 *
 * @param {express.Request} req - Objeto de solicitud de Express.
 * @param {express.Response & { paginatedResults: { next: { page: number; limit: number }; previous: { page: number; limit: number } } }} res - Objeto de respuesta de Express con la propiedad paginatedResults.
 * @returns {Promise<void>} - Una promesa que resuelve con un objeto de respuesta de Express.
 */
export const getAllUsers = async (
  req: express.Request,
  res: express.Response & {
    paginatedResults: {
      next: { page: number; limit: number };
      previous: { page: number; limit: number };
    };
  }
) => {
  try {
    return res.json(res.paginatedResults);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
};

/**
 * Obtiene el usuario actual basado en el token de sesión de las cookies de la solicitud
 *
 * @param {express.Request} req - Objeto de solicitud de Express.
 * @param {express.Response} res - Objeto de respuesta de Express.
 * @returns {Promise<void>} - Una promesa que resuelve con un objeto de respuesta de Express.
 */
export const getCurrentUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const sessionToken = req.cookies["sessionToken"];

    // Si no existe la cookie de sesión no se puede obtener el usuario

    if (!sessionToken) {
      return res.status(400).send("There is not an active session");
    }

    // Se obtiene el usuario por medio del token de sesión

    const user = await getUserBySessionToken(sessionToken);

    // Si no existe el usuario no se puede obtener la sesión

    if (!user) {
      return res.status(400).send("There is not an active session");
    }

    return res.status(200).send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
};
