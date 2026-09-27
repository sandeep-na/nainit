import type { Request, Response } from "express";
import { Service } from "../models/Service.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const listServices = asyncHandler(async (_req: Request, res: Response) => {
  res.json(await Service.find().sort({ title: 1 }));
});

export const getService = asyncHandler(async (req: Request, res: Response) => {
  const service = await Service.findOne({ slug: req.params.slug });
  if (!service) {
    res.status(404).json({ message: "Service not found." });
    return;
  }
  res.json(service);
});
