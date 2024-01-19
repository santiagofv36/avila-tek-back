import express from "express";
import { login, logout, register } from "../controllers/authentication";


/**
 * Configura las rutas de autenticación en el router de Express.
 * 
 * @param {express.Router} router - Objeto de router de Express.
 * @returns {void} - Nada.
 */
export default (router: express.Router): void => {
  router.post("/auth/sign-up", register);
  router.post("/auth/sign-in", login);
  router.delete("/auth/sign-out", logout);
};
