import { NextResponse } from "next/server";
import Product from "../../../../models/Product";
import { connectDB } from "../../../../libs/mongodb";
import InventoryTransaction from "../../../../models/InventarioTrans";

export async function POST(request: Request) {
  const { 
    name, 
    description, 
    price, 
    code, 
    stock, 
    expirationDate 
  } = await request.json();

  // Validación básica
  if (!name || !description || price < 0 || !code || stock < 0) {
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
      expirationDate: expirationDate ? new Date(expirationDate) : undefined // Si no se proporciona una fecha de expiración, se establece en undefined.
    });

    const savedProduct = await product.save();

    return NextResponse.json(savedProduct);
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


export async function PUT(request: Request): Promise<any> {
  const { id, name, price, description, code, stock } = await request.json();

  if (!id || !name || price === undefined || !description || !code || stock === undefined) {
    return NextResponse.json(
      {
        message: "Los campos son requeridos.",
      },
      {
        status: 400,
      }
    );
  }

  try {
    await connectDB();
    const productFound = await Product.findById(id);

    if (productFound) {
      const transactionType = stock > productFound.stock ? "entrada" : "salida";
      const stockDifference = Math.abs(stock - productFound.stock);

      // Crear una nueva transacción sin el campo user
      const transaction = new InventoryTransaction({
        type: transactionType,
        product: productFound._id,
        Stock: stockDifference,
      });

      await transaction.save();

      // Actualizar el producto
      productFound.name = name;
      productFound.price = price;
      productFound.description = description;
      productFound.code = code;
      productFound.stock = stock;
      await productFound.save();

      return NextResponse.json({
        name: productFound.name,
        price: productFound.price,
        description: productFound.description,
        code: productFound.code,
        stock: productFound.stock,
        _id: productFound._id,
      });
    } else {
      return NextResponse.json(
        {
          message: "Producto no encontrado.",
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
        message: "Error interno del servidor.",
      },
      {
        status: 500, // Código de estado general para "Error Interno del Servidor"
      }
    );
  }
}


