
import mongoose from "mongoose";

const {MONGODB_URI} = process.env
if(!MONGODB_URI) {
    throw new Error ("MONGODB_URI MUST BE DEFINED");
}
export const connectDB = async () =>{
    try{
   const {connection} =await mongoose.connect(MONGODB_URI);
   if(connection.readyState == 1) {
    console.log("connected")
    return Promise.resolve(true)
   } 
} catch (error) {
    console.log(error);
    return Promise.resolve(false)
}
};