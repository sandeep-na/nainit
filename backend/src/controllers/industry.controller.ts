import type { Request, Response } from "express";
import { Industry } from "../models/Industry.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const listIndustries = asyncHandler(async (_req: Request, res: Response) => {
  res.json(await Industry.find().sort({ title: 1 }));
});

export const getIndustry = asyncHandler(async (req: Request, res: Response) => {
  const industry = await Industry.findOne({ slug: req.params.slug });
  if (!industry) {
    res.status(404).json({ message: "Industry not found." });
    return;
  }
  res.json(industry);
});
