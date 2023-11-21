// pages/api/pdfReportTransaction/index.ts
import { NextResponse } from 'next/server';
import PdfReportTransaction from '../../../../models/PdfReportTransaction';
import { connectDB } from '../../../../libs/mongodb';

export async function POST(request: Request): Promise<any> {
  try {
    await connectDB();

    // Crea una nueva transacción con la fecha actual
    const pdfReportTransaction = new PdfReportTransaction();

    // Guarda la transacción en la base de datos
    await pdfReportTransaction.save();

    return NextResponse.json(
      {
        transactionId: pdfReportTransaction._id,
        date: pdfReportTransaction.date,
      },
      {
        status: 201,
      }
    );
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
