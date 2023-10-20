// models/Product.ts
import mongoose, { Document } from 'mongoose';

export interface ProductDocument extends Document {
  name: string;
  price: number;
  description: string;
  code: string;
  stock:string;

}

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  description: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
});

export default mongoose.models.Product || mongoose.model<ProductDocument>('Product', productSchema);
