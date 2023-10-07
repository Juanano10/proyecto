import { NextResponse } from "next/server";
import User from "../../../../models/user";
import bcrypt from 'bcryptjs'
import { connectDB } from "../../../../libs/mongodb";


export async function POST(request: Request) {
  const { name, email, password } = await request.json();
  console.log(name, email, password);
  if (!password || password.length < 6)
    return NextResponse.json(
      {
        message: "La contrasena debe tener al menos 6 caracteres",
      },
      {
        status: 400,
      }
    );

  try {
    await connectDB()
    const userFound = await User.findOne({ email });
  if (userFound)
    return NextResponse.json(
      {
        message: "email already exists",
      },
      { status: 409 }
    );
const hashedPassword = await bcrypt.hash(password,12)
    const user = new User({
        email,
        name,
        password: hashedPassword
    })
    const savedUser = await user.save()
    console.log(savedUser)
  return NextResponse.json({
    email:savedUser.email,
    name:savedUser.name,
    _id:savedUser._id
  });
  } catch (error) {
    console.log(error)
    return NextResponse.error();
    
  }
}
