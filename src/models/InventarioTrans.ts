import mongoose, { Document, Schema } from 'mongoose';

// 1. Eliminado el campo user de la interfaz
export interface InventoryTransactionDocument extends Document {
  type: 'entrada' | 'salida';
  product: Schema.Types.ObjectId;
  Stock: number;
  timestamp?: Date;
}

const inventoryTransactionSchema = new Schema<InventoryTransactionDocument>({
  type: { type: String, enum: ['entrada', 'salida'], required: true },
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  Stock: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
  // 2. Eliminado el campo user del esquema
});


const modelName = 'InventoryTransaction';
const InventoryTransaction = mongoose.models[modelName] 
  ? mongoose.model<InventoryTransactionDocument>(modelName) 
  : mongoose.model<InventoryTransactionDocument>(modelName, inventoryTransactionSchema);

export default InventoryTransaction;

