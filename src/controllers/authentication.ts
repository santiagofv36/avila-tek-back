import express from "express";
import {
  createUser,
  getUserByEmail,
  getUserBySessionToken,
} from "../actions/user-actions";
import { authentication, random } from "../helpers";

/**
 * Cierra sesión en la aplicación y elimina la cookie de sesión.
 *
 * @param {express.Request} req - Objeto de solicitud de Express.
 * @param {express.Response} res - Objeto de respuesta de Express.
 * @returns {express.Response} Una respuesta de Express.
 */
export const logout = async (
  req: express.Request,
  res: express.Response
): Promise<express.Response<any, Record<string, any>>> => {
  try {
    // Se obtiene la cookie de sesión
    const sessionToken = req.cookies["sessionToken"];

    // Si no existe la cookie de sesión no se puede hacer logout
    if (!sessionToken) {
      return res.status(400).send("There is not an active session");
    }

    // Se obtiene el usuario por medio del token de sesión
    const user = await getUserBySessionToken(sessionToken);

    // Si no existe el usuario no se puede hacer logout
    if (!user) {
      return res.status(400).send("There is not an active session");
    }

    // Se elimina el token de sesión del usuario
    user.authentication.sessionToken = undefined;

    // Se guarda el usuario en la base de datos
    await user.save();

    // Elimina la cookie de sesión
    res.clearCookie("sessionToken");

    return res.status(200).send("Logout successful");
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
};

/**
 * Inicia sesión en la aplicación y crea una cookie de sesión.
 *
 * @param {express.Request} req - Objeto de solicitud de Express.
 * @param {express.Response} res - Objeto de respuesta de Express.
 * @returns {express.Response} Una respuesta de Express.
 */
export const login = async (
  req: express.Request,
  res: express.Response
): Promise<express.Response<any, Record<string, any>>> => {
  try {
    const { email, password } = req.body;

    const sessionToken = req.cookies["sessionToken"];

    // Si ya existe una cookie de sesión no se puede hacer login
    if (sessionToken) {
      return res.status(400).send("There is an active session");
    }

    if (!email || !password) {
      return res.status(400).send("Missing email or password");
    }

    // Aqui se hace uso del select para que se muestre el salt y la contraseña al hacer la consulta
    const user = await getUserByEmail(email).select(
      "+authentication.salt +authentication.password"
    );

    // Si no existe el usuario no se puede hacer login
    if (!user) {
      return res.status(400).send("User does not exist");
    }

    // Se extrae el Salt del apartado de autenticacion del usuario
    const { salt } = user.authentication;

    // Se compara la contraseña ingresada con la contraseña encriptada del usuario
    if (authentication(salt, password) !== user.authentication.password) {
      return res.status(403).send("Invalid credentials");
    }

    // Se crea un token de sesión
    const sessionSalt = random();
    user.authentication.sessionToken = authentication(
      sessionSalt,
      user._id.toString()
    );

    // Se guarda el token de sesión en la base de datos
    await user.save();

    // Se crea una cookie con el token de sesión

    res.cookie("sessionToken", user.authentication.sessionToken, {
      domain: "localhost", // La cookie solo se puede usar en localhost
      path: "/", // La cookie se puede usar en cualquier ruta
    });

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
};

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
