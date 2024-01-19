import { UserModel } from "../db/user";

export const getUsers = () => UserModel.find();

export const getUserBySessionToken = (sessionToken: string) =>
  UserModel.findOne({ "authentication.sessionToken": sessionToken });

export const createUser = (values: Record<string, any>) =>
  new UserModel(values).save().then((user) => user.toObject());

export const getUserByEmail = (email: string) => UserModel.findOne({ email });
