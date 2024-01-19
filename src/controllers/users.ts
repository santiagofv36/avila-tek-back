import express from "express";

import { getUsers } from "../actions/user-actions";

export const getAllUsers = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const users = await getUsers();
    //TODO: Hacer paginación

    return res.status(200).send(users);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
};
