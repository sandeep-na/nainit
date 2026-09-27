import mongoose, { Schema, Document } from "mongoose";

export interface IService extends Document {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  features: string[];
  priceFrom: string;
}

const serviceSchema = new Schema<IService>(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    tagline: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, default: "" },
    features: { type: [String], default: [] },
    priceFrom: { type: String, default: "" },
  },
  { timestamps: true }
);

export const Service = mongoose.models.Service || mongoose.model<IService>("Service", serviceSchema);
