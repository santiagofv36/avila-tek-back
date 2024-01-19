import express from "express";
import { register } from "../controllers/authentication";

export default (router: express.Router): void => {
  router.post("/auth/sign-up", register);
};
