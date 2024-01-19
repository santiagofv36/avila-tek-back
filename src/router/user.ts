import express from "express";
import { getCurrentUser } from "../controllers/users";

export default (router: express.Router): void => {
  router.get("/user", getCurrentUser);
};
