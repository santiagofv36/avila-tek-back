import express from "express";

import { getAllUsers } from "../controllers/users";
import { PaginatedResults } from "../helpers";
import { UserModel } from "../db/user";

export default (router: express.Router): void => {
  router.get("/users", PaginatedResults(UserModel) ,getAllUsers);
};
