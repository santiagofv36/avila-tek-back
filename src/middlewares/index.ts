import express from "express";
import { getUserBySessionToken } from "../actions/user-actions";

export const isAuthenticated = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const sessionToken = req.cookies["sessionToken"];

    if (!sessionToken) {
      return res.status(401).send("Unauthorized");
    }

    const user = await getUserBySessionToken(sessionToken);

    if (!user) {
      return res.status(401).send("Unauthorized");
    }
    // Una vez que se ha verificado que el usuario esta autenticado, se pasa a la siguiente función
    
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).send("Internal server error");
  }
};
