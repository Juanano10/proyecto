import { NextResponse } from "next/server";
import InventoryTransaction from "../../../../../models/InventarioTrans";
import { connectDB } from "../../../../../libs/mongodb";




export async function GET() {
    await connectDB();
    const inventoryTransactions = await InventoryTransaction.find();
    return NextResponse.json({ inventoryTransactions }, { status: 200 });
  }
  