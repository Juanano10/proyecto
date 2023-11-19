import { NextResponse } from "next/server";
import { User } from "../../../../models/user";
import bcrypt from 'bcryptjs'
import { connectDB } from "../../../../libs/mongodb";

export async function POST(request: Request) {
  const { name, email, password, role } = await request.json();
  console.log(name, email, password, role);

  if (!password || password.length < 6) {
    return NextResponse.json(
      {
        message: "La contraseña debe tener al menos 6 caracteres",
      },
      {
        status: 400,
      }
    );
  }

  try {
    await connectDB();

    // Verifica si ya existe un usuario con el mismo nombre
    const userWithSameName = await User.findOne({ name });
    if (userWithSameName) {
      return NextResponse.json(
        {
          message: "El nombre de usuario ya está en uso",
        },
        { status: 409 }
      );
    }

    // Verifica si ya existe un usuario con el mismo correo electrónico
    const userFound = await User.findOne({ email });
    if (userFound) {
      return NextResponse.json(
        {
          message: "El correo electrónico ya existe",
        },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      email,
      name,
      password: hashedPassword,
      role, // Aquí estableces el rol proporcionado en la solicitud
    });

    const savedUser = await user.save();
    console.log(savedUser);

    return NextResponse.json({
      email: savedUser.email,
      name: savedUser.name,
      _id: savedUser._id,
      role: savedUser.role, // Devuelve el campo "role" en la respuesta
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}


export async function GET() {
  await connectDB();
  const users = await User.find();
  return NextResponse.json({users}, {status:200});
      
}

export async function DELETE(){
  await connectDB();
  const DelUser = await User.deleteOne();
  return NextResponse.json({DelUser}) 
}

export async function PUT(request: Request): Promise<any> {
  const { id, password, role } = await request.json();

  if (!id || !password || password.length < 6) {
    return NextResponse.json(
      {
        message: "ID y contraseña válida son requeridos.",
      },
      {
        status: 400,
      }
    );
  }

  try {
    await connectDB();
    const userFound = await User.findById(id);

    if (userFound) {
      userFound.password = await bcrypt.hash(password, 12);
      userFound.role = role;
      await userFound.save();

      return NextResponse.json({
        email: userFound.email,
        name: userFound.name,
        _id: userFound._id,
        role: userFound.role,
      });
    } else {
      return NextResponse.json(
        {
          message: "Usuario no encontrado.",
        },
        {
          status: 404,
        }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Ha ocurrido un error al actualizar el usuario.",
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

