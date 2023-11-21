// models/PdfReportTransaction.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface PdfReportTransactionDocument extends Document {
  date: Date;
}

const pdfReportTransactionSchema = new Schema({
  date: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.PdfReportTransaction || mongoose.model<PdfReportTransactionDocument>('PdfReportTransaction', pdfReportTransactionSchema);
