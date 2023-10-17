import { NextResponse } from "next/server";
import Product from "../../../models/Product";
import { connectDB } from "../../../libs/mongodb";

export async function POST(request: Request) {
  const { name, description, price } = await request.json();

  if (!name || !description || price < 0) {
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

    const product = new Product({
      name,
      description,
      price,
    });

    const savedProduct = await product.save();

    return NextResponse.json(savedProduct);
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  }
}
