import mongoose, { Schema, Document } from "mongoose";

export interface IContact extends Document {
  userId?: mongoose.Types.ObjectId;
  name: string;
  email: string;
  company?: string;
  message: string;
  callRequest?: { preferredDate: string; preferredTime: string; timeZone: string; service: string; phone: string };
  status: "new" | "replied" | "archived";
}

const contactSchema = new Schema<IContact>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", index: true },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    company: { type: String, default: "" },
    message: { type: String, required: true, minlength: 10 },
    callRequest: {
      type: new Schema({
        preferredDate: { type: String, required: true },
        preferredTime: { type: String, required: true },
        timeZone: { type: String, required: true },
        service: { type: String, required: true },
        phone: { type: String, default: "" },
      }, { _id: false }),
      default: undefined,
    },
    status: { type: String, enum: ["new", "replied", "archived"], default: "new" },
  },
  { timestamps: true }
);

export const Contact = mongoose.models.Contact || mongoose.model<IContact>("Contact", contactSchema);
