import { NextResponse } from "next/server";
import Product from "../../../../models/Product";
import { connectDB } from "../../../../libs/mongodb";

export async function POST(request: Request) {
  const { name, description, price, code,stock } = await request.json();

  if (!name || !description || !price || !code || stock < 0) {
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
      code,
      stock,
    });

    const savedProduct = await product.save();
    console.log(savedProduct)

    return NextResponse.json({
      name: savedProduct.name,
      price:savedProduct.price,
      description:savedProduct.description,
      code:savedProduct.code,
      stock:savedProduct.stock,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.error();
  }
}


export async function GET() {
  await connectDB();
  const products = await Product.find();
  return NextResponse.json({products}, {status:200});
      
  }