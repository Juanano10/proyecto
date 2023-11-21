import { NextResponse } from "next/server";
import Product, {ProductDocument }from "../../../../models/Product";
import { connectDB } from "../../../../libs/mongodb";
import InventoryTransaction from "../../../../models/InventarioTrans";

export async function POST(request: Request): Promise<any> {
  const { name, price, description, code, stock, cost, category } = await request.json();

  if (!name || price === undefined || !description || !code || stock === undefined) {
    return NextResponse.json(
      {
        message: "Todos los campos son requeridos y deben ser válidos.",
      },
      {
        status: 400,
      }
    );
  }

  try {
    await connectDB();

    // Verificar si el nombre del producto ya existe
    const existingProduct = await Product.findOne({ name });

    if (existingProduct) {
      return NextResponse.json(
        {
          message: "Ya existe un producto con este nombre.",
        },
        {
          status: 400,
        }
      );
    }

    // Crear un nuevo producto
    const product = new Product({
      name,
      price,
      description,
      code,
      cost,
      category,
      stock,
    });
    await product.save();

    // Crear una nueva transacción en InventoryTransaction
    const transactionType = "entrada"; // Asumiendo que este es el valor predeterminado
    const stockDifference = stock; // Stock completo

    const transaction = new InventoryTransaction({
      type: transactionType,
      product: product._id,
      nameProduct: product.name,
      stock: stockDifference,
    });
    await transaction.save();

    return NextResponse.json({
      name: product.name,
      price: product.price,
      description: product.description,
      code: product.code,
      cost: product.cost,
      category: product.category,
      stock: product.stock,
      _id: product._id,
    });
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



export async function GET() {
  await connectDB();
  const products = await Product.find();
  return NextResponse.json({products}, {status:200});
      
}

export async function PUT(request: Request): Promise<any> {
  const { id, name, price, stock, cost } = await request.json();

  if (!id || !name || price === undefined || stock === undefined || cost === undefined) {
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
      // Actualizar el producto
      const updateFields: Record<string, any> = {
        name,
        price,
        stock,
        cost,
      };

      await Product.findByIdAndUpdate(id, updateFields);

      // Crear una nueva transacción
      const transactionType = stock > productFound.stock ? "entrada" : "salida";
      const stockDifference = Math.abs(stock - productFound.stock);

      // Crear una nueva transacción con el campo nameProduct
      const transaction = new InventoryTransaction({
        type: transactionType,
        product: productFound._id,
        stock: stockDifference,
        nameProduct: name, // Asegúrate de proporcionar un valor adecuado aquí
      });

      await transaction.save();

      return NextResponse.json({
        name: updateFields.name,
        price: updateFields.price,
        stock: updateFields.stock,
        cost: updateFields.cost,
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
        status: 500,
      }
    );
  }
}




