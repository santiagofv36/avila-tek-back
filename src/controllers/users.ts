import express from "express";

import { getUserBySessionToken } from "../actions/user-actions";

export const getAllUsers = async (
  req: express.Request,
  res: express.Response & {
    paginatedResults: {
      next: { page: number; limit: number };
      previous: { page: number; limit: number };
    };
  }
) => {
  try {
    return res.json(res.paginatedResults);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
};

export const getCurrentUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const sessionToken = req.cookies["sessionToken"];

    if (!sessionToken) {
      return res.status(400).send("There is not an active session");
    }

    const user = await getUserBySessionToken(sessionToken);

    if (!user) {
      return res.status(400).send("There is not an active session");
    }

    return res.status(200).send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
};
