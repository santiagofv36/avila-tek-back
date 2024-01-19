import mongoose from "mongoose";

// Modelo del usuario
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  authentication: {
    password: { type: String, required: true, select: false }, // El select false es para que no se muestre en las consultas
    salt: {
      type: String,
      select: false,
    },
    sessionToken: {
      type: String,
      select: false,
    },
  },
});

// Se exporta el modelo
export const UserModel = mongoose.model("User", userSchema);
