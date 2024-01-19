import mongoose from "mongoose";

// Modelo del usuario
/**
 * @typedef {Object} User
 * @property {string} email.required - Email del usuario
 * @property {Object} authentication.required - Objeto de autenticación del usuario
 * @property {string} authentication.password.required - Contraseña del usuario
 * @property {string} authentication.salt.required - Salt de la contraseña del usuario
 * @property {string} authentication.sessionToken.required - Token de sesión del usuario
 * @property {string} _id.required - ID del usuario
 * @property {string} __v.required - Versión del usuario
 */
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  authentication: {
    password: { type: String, required: true, select: false }, // El select false es para que no se muestre en las consultas
    salt: {
      type: String,
      select: false,
    },
    sessionToken: {
      type: String,
      select: false,
    },
  },
});

// Se exporta el modelo
export const UserModel = mongoose.model("User", userSchema);
