import mongoose, { Schema, Document } from "mongoose";

export interface IApplication extends Document {
  jobSlug: string;
  jobTitle: string;
  name: string;
  email: string;
  phone?: string;
  link: string;
  experience: string;
  coverNote?: string;
  status: "new" | "shortlisted" | "rejected" | "hired";
}

const applicationSchema = new Schema<IApplication>(
  {
    jobSlug: { type: String, required: true, trim: true },
    jobTitle: { type: String, required: true, trim: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    phone: { type: String, default: "" },
    link: { type: String, required: true, trim: true },
    experience: { type: String, required: true, trim: true },
    coverNote: { type: String, default: "" },
    status: { type: String, enum: ["new", "shortlisted", "rejected", "hired"], default: "new" },
  },
  { timestamps: true }
);

export const Application =
  mongoose.models.Application || mongoose.model<IApplication>("Application", applicationSchema);
