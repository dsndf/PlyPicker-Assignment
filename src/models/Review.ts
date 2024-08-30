import mongoose, { Model, Schema } from "mongoose";
import { Document } from "mongoose";
export interface Ireview extends Document {
  suggestedProductName: string;
  suggestedProductPrice: string;
  suggestedProductDescription: string;
  suggestedProductImage: string;
  status: "Pending" | "Rejected" | "Approved";
  product: mongoose.Schema.Types.ObjectId;
  author: mongoose.Schema.Types.ObjectId;
  admin: mongoose.Schema.Types.ObjectId;
}
const reviewSchema = new Schema<Ireview>(
  {
    suggestedProductName: String,
    suggestedProductImage: String,
    suggestedProductPrice: Number,
    suggestedProductDescription: String,
    status: {
      type: String,
      default: "Pending",
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const reviewCollection: Model<Ireview> =
  mongoose.models.Review || mongoose.model<Ireview>("Review", reviewSchema);
