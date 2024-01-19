import express from "express";
import authentication from "./authentication";

const router = express.Router();

/**
 * Inicializa y retorna un router de Express con middleware de autenticacion.
 * 
 * @returns {express.Router} Una instancia de express.Router
 */
export default (): express.Router => {
  authentication(router);

  return router;
};
