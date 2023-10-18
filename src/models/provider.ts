import mongoose, { Document } from "mongoose";

export interface ProviderDocument extends Document {
  name: string;
  address: string;
  phone: string;
  email:string;
}

const providerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: {type: String, required: true},
  phone: {type:String, required:true },
  email:{type: String, required:true}
  
});






const Provider = mongoose.model('Provider', providerSchema);

export default Provider;