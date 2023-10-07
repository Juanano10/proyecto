import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Correo invalido"]
  },
  password: {
    type: String,
    required: [true, "Contrasena requerida"],
    select: false
  },
  name: {
    type: String,
    required: [true, "Nombre completo requerido"],
    minLength: [3, "el nombre debe contener al menos 3 caracteres"],
    maxLength: [50, "El nombre no puede pasar los 50 caracteres"]
  }
});

const User = models.User || model("User", userSchema);
export default User;
