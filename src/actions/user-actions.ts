import { UserModel } from "../db/user";


/**
 * Obtiene un usuario por su token de sesión
 *
 * @param {string} sessionToken - El token de sesión del usuario
 * @returns {Promise<User | null>} Una promesa que resuelve en un usuario o null
 */
export const getUserBySessionToken = (sessionToken: string) =>
  UserModel.findOne({ "authentication.sessionToken": sessionToken });

/**
 * Crear un usuario en la base de datos.
 *
 * @param {Record<string, any>} values - Los valores del usuario a crear
 * @returns {Promise<User>} Una promesa que resuelve en un usuario
 */
export const createUser = (values: Record<string, any>) =>
  new UserModel(values).save().then((user) => user.toObject());


/**
 * Obtiene un usuario por su email
 * 
 * @param {string} email - El email del usuario
 * @returns {Promise<User | null>} Una promesa que resuelve en un usuario o null
 */

export const getUserByEmail = (email: string) => UserModel.findOne({ email });
