import { UserModel } from "../db/user";

/**
 * Obtiene todos los usuarios de la base de datos
 *
 * @returns {Promise<User[]>} Una promesa que resuelve en un arreglo de usuarios
 */
export const getUsers = () => UserModel.find();

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

export const getUserByEmail = (email: string) => UserModel.findOne({ email });
