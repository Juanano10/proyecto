import mongoose, { Document } from "mongoose";

export interface ProductDocument extends Document {
  name: string;
  price: number;
  description: string;
  code: string;
  stock: Number;
  expirationDate:Date;
  suppliers:string;
}

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  expirationDate: Date,
  suppliers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Provider" }],
});

const Product = mongoose.model<ProductDocument>("Product", productSchema);

export default Product;
