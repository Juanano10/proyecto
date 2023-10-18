import mongoose, { Document, Schema } from 'mongoose';


export interface InventoryTransactionDocument extends Document {
  type: 'entrada' | 'salida';
  product: Schema.Types.ObjectId;
  quantity: number;
  timestamp?: Date;
  user?: Schema.Types.ObjectId;
}


const inventoryTransactionSchema = new Schema<InventoryTransactionDocument>({
  type: { type: String, enum: ['entrada', 'salida'], required: true },
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
  user: { type: Schema.Types.ObjectId, ref: 'User' }, 
});


const InventoryTransaction = mongoose.model<InventoryTransactionDocument>('InventoryTransaction', inventoryTransactionSchema);

export default InventoryTransaction;
