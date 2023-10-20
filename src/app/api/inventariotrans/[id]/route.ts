import { NextResponse } from "next/server";
import { InventoryTransactionDocument } from "../../../../models/InventarioTrans";
import { connectDB } from "../../../../libs/mongodb";
import { time } from "console";
import InventoryTransaction from "../../../../models/InventarioTrans";

export async function POST(request: Request) {
    const { 
      type, 
      product, 
      quantity, 
      timestamp, 
      user
    } = await request.json();
  
    // Validación básica
    if (!type || !product || quantity < 0 || !timestamp || !user) {
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
  
      const InventoryTransaction = new InventoryTransaction({
        type,
        product,
        quantity,
        timestamp,
        user,
      });
  
      const savedInventoryTransaction = await InventoryTransaction.save();
  
      return NextResponse.json(InventoryTransaction);
    } catch (error) {
      console.log(error);
      return NextResponse.error();
    }
}