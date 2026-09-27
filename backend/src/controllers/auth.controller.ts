import type { Request, Response } from "express";
import { User } from "../models/User.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { signToken } from "../utils/sendToken.js";

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body as { email: string; password: string };
  const user = await User.findOne({ email: email.toLowerCase() }).select("+password");
  if (!user || !(await user.comparePassword(password)) || user.role !== "admin") {
    res.status(401).json({ message: "Invalid email or password." });
    return;
  }
  res.json({
    token: signToken(user.id),
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
  });
});

export const me = asyncHandler(async (req: Request, res: Response) => {
  const user = await User.findById((req as { userId?: string }).userId);
  if (!user) {
    res.status(404).json({ message: "User not found." });
    return;
  }
  res.json({ id: user.id, name: user.name, email: user.email, role: user.role });
});
