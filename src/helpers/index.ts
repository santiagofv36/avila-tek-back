import crypto from "crypto";
import express from "express";
import mongoose from "mongoose";

// Se deberia guardar en .env, pero por simplicidad se deja aquí
const SECRET: string = "bcea0ea6-c5e7-4220-b6dc-a42e34c0d24d";

/**
 * Genera un string aleatorio usando crypto.
 *
 * @returns {string} Un string aleatorio en base64
 */
export const random = (): string => crypto.randomBytes(128).toString("base64");

/**
 * Encripta la contraseña usando un salt.
 *
 * @param {string} salt El salt a usar
 * @param {string} password La contraseña a encriptar
 * @returns {string} La contraseña encriptada
 */
export const authentication = (salt: string, password: string): string => {
  return crypto
    .createHmac("sha256", [salt, password].join(":"))
    .update(SECRET)
    .digest("hex");
};

/**
 * Funcion de middleware para paginar los resultados de una consulta.
 *
 * @template T - El tipo de dato del modelo
 * @param {mongoose.Model<T>} model - El modelo a paginar
 * @returns {Promise<void>} Una promesa que resuelve en void
 */

export const PaginatedResults = <T>(model: mongoose.Model<T>) => {
  return async (
    req: express.Request,
    res: express.Response & { paginatedResults: mongoose.Model<T>[] },
    next: express.NextFunction
  ) => {
    // Se obtienen los parametros de la consulta para la paginación y se asignan valores por defecto en caso de que no se envien

    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    // Se calcula el indice inicial y el indice final de los resultados

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    // Se crea un objeto para guardar los resultados de la consulta

    const results: any = {};

    // Se verifica si hay resultados siguientes o anteriores para agregarlos al objeto

    if (endIndex < (await model.countDocuments().exec())) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }

    // Se realiza la consulta con los parametros de paginación

    results.results = await model.find().limit(limit).skip(startIndex).exec();

    // Se asignan los resultados a la respuesta

    res.paginatedResults = results;

    // Se pasa a la siguiente función

    next();
  };
};
