import { NextResponse } from "next/server";
import Product from "../../../../models/Product";
import { connectDB } from "../../../../libs/mongodb";



export async function POST(request: Request) {
  const {
    name,
    description,
    price,
    code,
    stock,
    expirationDate
  } = await request.json();

  if (!name || !description || !code || price < 0 || stock < 0 || !expirationDate) {
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
      expirationDate: new Date(expirationDate)
    });

    await product.save();

    return NextResponse.json({
      message: "Producto registrado con éxito.",
      product: product,
    });

  } catch (error) {
    console.error("Error al registrar producto:", error);

    return NextResponse.json({
      message: "Error interno del servidor.",
    }, {
      status: 500,
    });
  }
}



export async function GET() {
  await connectDB();
  const products = await Product.find();
  return NextResponse.json({products}, {status:200});
      
}



export async function PUT(request: Request) {
  const { 
    id, 
    name, 
    code, 
    description, 
    price, 
    stock, 
    expirationDate, 
    suppliers 
  } = await request.json();

  // Simple validation
  if (!name || name.length < 3 || name.length > 50)
    return NextResponse.json(
      {
        message: "El nombre del producto debe contener entre 3 y 50 caracteres",
      },
      {
        status: 400,
      }
    );

  if (!price || price <= 0)
    return NextResponse.json(
      {
        message: "Precio inválido",
      },
      {
        status: 400,
      }
    );

  if (!stock || stock < 0)
    return NextResponse.json(
      {
        message: "Cantidad en stock inválida",
      },
      {
        status: 400,
      }
    );

  try {
    const productFound = await Product.findById(id);

    if (productFound) {
      productFound.name = name;
      productFound.code = code;
      productFound.description = description || productFound.description;
      productFound.price = price;
      productFound.stock = stock;
      productFound.expirationDate = expirationDate || productFound.expirationDate;
      productFound.suppliers = suppliers || productFound.suppliers;

      await productFound.save();

      return NextResponse.json({
        name: productFound.name,
        code: productFound.code,
        description: productFound.description,
        price: productFound.price,
        stock: productFound.stock,
        expirationDate: productFound.expirationDate,
        suppliers: productFound.suppliers,
      });
    } else {
      const newProduct = new Product({
        name,
        code,
        description,
        price,
        stock,
        expirationDate,
        suppliers
      });
      const savedProduct = await newProduct.save();

      return NextResponse.json({
        name: savedProduct.name,
        code: savedProduct.code,
        description: savedProduct.description,
        price: savedProduct.price,
        stock: savedProduct.stock,
        expirationDate: savedProduct.expirationDate,
        suppliers: savedProduct.suppliers,
      });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
