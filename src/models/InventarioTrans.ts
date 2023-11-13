import mongoose, { Document, Schema } from 'mongoose';

// 1. Eliminado el campo user de la interfaz
export interface InventoryTransactionDocument extends Document {
  type: 'entrada' | 'salida';
  product: Schema.Types.ObjectId;
  nameProduct: string;
  stock: string;
  timestamp?: Date;
}

const inventoryTransactionSchema = new Schema<InventoryTransactionDocument>({
  type: { type: String, enum: ['entrada', 'salida'], required: true },
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  nameProduct:{type: String,required:true, ref:'Product'},
  stock: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});


const modelName = 'InventoryTransaction';
const InventoryTransaction = mongoose.models[modelName] 
  ? mongoose.model<InventoryTransactionDocument>(modelName) 
  : mongoose.model<InventoryTransactionDocument>(modelName, inventoryTransactionSchema);

export default InventoryTransaction;

