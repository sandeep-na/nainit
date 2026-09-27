import "dotenv/config";
import mongoose from "mongoose";
import { connectDB } from "../config/db.js";
import { User } from "../models/User.js";

async function createAdmin() {
  const name = process.env.ADMIN_NAME?.trim();
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD;
  if (!name || name.length < 2 || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !password || password.length < 12) {
    throw new Error("Set ADMIN_NAME, ADMIN_EMAIL, and ADMIN_PASSWORD (at least 12 characters) before running admin:create.");
  }
  await connectDB(process.env.MONGO_URI ?? "");
  if (await User.exists({ email })) throw new Error("An account already uses this email. No account was changed.");
  await User.create({ name, email, password, role: "admin" });
  console.log("Administrator created. Sign in at /admin/login.");
}

createAdmin().catch((error) => {
  console.error(error instanceof Error ? error.message : "Could not create the administrator.");
  process.exitCode = 1;
}).finally(() => mongoose.disconnect());
