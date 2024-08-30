import mongoose, { Model, Schema } from "mongoose";
import { Document } from "mongoose";
export interface Iproduct extends Document {
  productName: string;
  productPrice: string;
  productImage: string;
  productDescription: string;
  admin: mongoose.Schema.Types.ObjectId;
}
const productSchema = new Schema<Iproduct>(
  {
    productName: { type: String, required: true },
    productDescription: { type: String, required: true },
    productPrice: { type: String, required: true },
    productImage: { type: String, required: true },
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

export const productCollection: Model<Iproduct> =
  mongoose.models.Product || mongoose.model<Iproduct>("Product", productSchema);
