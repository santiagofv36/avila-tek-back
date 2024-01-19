import express from "express";
import { login, logout, register } from "../controllers/authentication";

export default (router: express.Router): void => {
  router.post("/auth/sign-up", register);
  router.post("/auth/sign-in", login);
  router.get("/auth/sign-out", logout);
};
