import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

export interface AuthRequest extends Request {
  userId?: string;
}

const JWT_SECRET = process.env.JWT_SECRET ?? "dev-secret-change-me";

/** Protects routes — requires `Authorization: Bearer <token>`. */
export async function protect(req: AuthRequest, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not authorized — please sign in." });
  }
  try {
    const decoded = jwt.verify(header.split(" ")[1], JWT_SECRET) as { id: string };
    const user = await User.findById(decoded.id).select("_id");
    if (!user) return res.status(401).json({ message: "User no longer exists." });
    req.userId = user.id;
    next();
  } catch {
    return res.status(401).json({ message: "Session expired — please sign in again." });
  }
}

export async function requireAdmin(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const user = await User.findById(req.userId).select("role");
    if (user?.role !== "admin") return res.status(403).json({ message: "Administrator access required." });
    next();
  } catch (error) { next(error); }
}
