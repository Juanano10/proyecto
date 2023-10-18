import { NextResponse } from "next/server";
import Provider from "../../../models/provider";
import { connectDB } from "../../../libs/mongodb";

export async function POST(request: Request) {
    const { name, email, phone, address } = await request.json();
  
    if (!name || !email || !phone || !address) {
      return NextResponse.json(
        {
          message: "Todos los campos requeridos deben estar presentes y ser válidos.",
        },
        {
          status: 400,
        }
      );
    }
  
    try {
      await connectDB();
  
      const provider = new Provider({
        name,
        email,
        phone,
        address,
      });
  
      const savedProvider = await provider.save();
  
      return NextResponse.json(savedProvider);
    } catch (error) {
      console.log(error);
      return NextResponse.error();
    }
  }
  