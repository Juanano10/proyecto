import mongoose, { Document } from 'mongoose';

export interface ProductDocument extends Document {
  name: string;
  price: number;
  description: string;
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
});

const Product = mongoose.model<ProductDocument>('Product', productSchema);

export default Product;
