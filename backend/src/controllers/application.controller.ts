import type { Request, Response } from "express";
import { Application } from "../models/Application.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const submitApplication = asyncHandler(async (req: Request, res: Response) => {
  const { jobSlug, jobTitle, name, email, phone, link, experience, coverNote } = req.body;
  const app = await Application.create({
    jobSlug,
    jobTitle,
    name,
    email,
    phone: phone ?? "",
    link,
    experience,
    coverNote: coverNote ?? "",
  });
  res.status(201).json({ ok: true, id: app.id, message: "Application received! Our hiring team replies within 5 days." });
});

export const listApplications = asyncHandler(async (_req: Request, res: Response) => {
  const apps = await Application.find().sort({ createdAt: -1 }).limit(100);
  res.json({ data: apps.map(a => ({ id: a.id, name: a.name, email: a.email, phone: a.phone ?? "", jobSlug: a.jobSlug, jobTitle: a.jobTitle, link: a.link, experience: a.experience, coverNote: a.coverNote ?? "", status: a.status, createdAt: a.get("createdAt") })) });
});

export const updateApplicationStatus = asyncHandler(async (req: Request, res: Response) => {
  const record = await Application.findByIdAndUpdate(req.params.id, { $set: { status: req.body.status } }, { new: true, runValidators: true });
  if (!record) { res.status(404).json({ message: "Record not found." }); return; }
  res.json({ id: record.id, status: record.status });
});
