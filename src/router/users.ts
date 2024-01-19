import express from "express";

import { getAllUsers } from "../controllers/users";
import { PaginatedResults } from "../helpers";
import { UserModel } from "../db/user";

/**
 * Configura las rutas de los usuarios en el router de Express.
 * 
 * @param {express.Router} router - Objeto de router de Express.
 * @returns {void} - Nada.
 */
export default (router: express.Router): void => {
  router.get("/users", PaginatedResults(UserModel) ,getAllUsers);
};
