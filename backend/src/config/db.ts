import mongoose from "mongoose";

export async function connectDB(uri: string) {
  if (!uri) throw new Error("MONGO_URI is missing — copy backend/.env.example to .env");
  mongoose.set("strictQuery", true);
  await mongoose.connect(uri);
  console.log("MongoDB connected");
}
