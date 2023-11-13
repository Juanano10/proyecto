// models/Product.ts
import mongoose, { Document } from 'mongoose';

export interface ProductDocument extends Document {
  name: string;
  price: number;
  cost: number;
  description: string;
  category: string;
  code: string;
  stock:string;

}

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  cost:{
    type: Number,
    required: true,
    min: 1,
  },
  price: {
    type: Number,
    required: true,
    min: 1,
  },
  description: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  category:{
    type: String,
    required: true,
  },
});

export default mongoose.models.Product || mongoose.model<ProductDocument>('Product', productSchema);
