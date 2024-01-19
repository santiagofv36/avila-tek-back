import express from "express";
import { getCurrentUser } from "../controllers/users";


/**
 * Configura las rutas de usuario en el router de Express.
 * 
 * @param {express.Router} router - Objeto de router de Express.
 * @returns {void} - Nada.
 */
export default (router: express.Router): void => {
  router.get("/user", getCurrentUser);
};
