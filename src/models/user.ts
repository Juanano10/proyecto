// En el modelo de usuario (models/user.ts)
import { Schema, model, models, Document } from "mongoose";

// Enumeración de los roles permitidos
enum UserRoles {
  CONSULTOR = "consultor",
  REPONEDOR = "reponedor",
  ADMINISTRADOR = "administrador",
}

interface UserDocument extends Document {
  email: string;
  password: string;
  name: string;
  role: UserRoles; // Campo "role" con tipo UserRoles
}

const userSchema = new Schema<UserDocument>({
  email: {
    type: String,
    unique: true,
    required: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+/,
      "Correo inválido",
    ],
  },
  password: {
    type: String,
    required: [true, "Contraseña requerida"],
    select: false,
  },
  name: {
    type: String,
    required: [true, "Nombre completo requerido"],
    minLength: [3, "El nombre debe contener al menos 3 caracteres"],
    maxLength: [50, "El nombre no puede superar los 50 caracteres"],
  },
  role: {
    type: String,
    enum: Object.values(UserRoles),
    default: UserRoles.CONSULTOR,
  },
});

const User = models.User || model<UserDocument>("User", userSchema);

export { User, UserRoles };
