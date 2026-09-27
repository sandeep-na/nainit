import mongoose, { Schema, Document } from "mongoose";

export interface IIndustry extends Document {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
}

const industrySchema = new Schema<IIndustry>(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    tagline: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, default: "" },
  },
  { timestamps: true }
);

export const Industry = mongoose.models.Industry || mongoose.model<IIndustry>("Industry", industrySchema);
