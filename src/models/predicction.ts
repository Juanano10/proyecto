import mongoose, { Document, Schema } from 'mongoose';


export interface ReplenishmentPredictionDocument extends Document {
  product: Schema.Types.ObjectId;
  recommendedQuantity: number;
  nextReplenishmentDate: Date;
  predictionMethod?: string;
}


const replenishmentPredictionSchema = new Schema<ReplenishmentPredictionDocument>({
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  recommendedQuantity: { type: Number, required: true },
  nextReplenishmentDate: { type: Date, required: true },
  predictionMethod: String,
});


const ReplenishmentPrediction = mongoose.model<ReplenishmentPredictionDocument>('ReplenishmentPrediction', replenishmentPredictionSchema);

export default ReplenishmentPrediction;