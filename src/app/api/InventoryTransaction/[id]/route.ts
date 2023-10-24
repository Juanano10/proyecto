import { NextResponse } from "next/server";
import { connectDB } from "../../../../libs/mongodb";
import InventoryTransaction from "../../../../models/InventarioTrans";



export async function GET() {
  await connectDB();
  const history = await InventoryTransaction.find();
  return NextResponse.json({history}, {status:200});
      
}