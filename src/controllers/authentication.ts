import express from "express";
import { createUser, getUserByEmail } from "../actions/user-actions";
import { authentication, random } from "../helpers";

/**
 * Registra un usuario en la base de datos.
 *
 * @param {express.Request} req - Objeto de solicitud de Express.
 * @param {express.Response} res - Objeto de respuesta de Express.
 * @returns {express.Response} Una respuesta de Express.
 */
export const register = async (
  req: express.Request,
  res: express.Response
): Promise<express.Response<any, Record<string, any>>> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send("Missing email or password");
    }

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return res.status(400).send("User already exists");
    }

    // Se crea el Salt haciendo uso de la funcion helper y se encripta la contraseña
    const salt = random();

    // Se crea el usuario y se guarda en la base de datos
    const user = await createUser({
      email,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });

    return res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};
