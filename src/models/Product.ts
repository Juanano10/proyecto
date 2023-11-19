// models/Product.ts
import mongoose, { Document } from 'mongoose';

// Enumeración de los tipos de productos
enum ProductTypes {
  ZAPATILLAS = "zapatillas",
  CAMISETAS = "camisetas",
  PANTALONES = "pantalones",
  ACCESORIOS = "accesorios",
  // Agrega más tipos de productos según sea necesario
}


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
  category: {
    type: String,
    enum: Object.values(ProductTypes),
    default: ProductTypes.ZAPATILLAS,
  },
});

export default mongoose.models.Product || mongoose.model<ProductDocument>('Product', productSchema);
