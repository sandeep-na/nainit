import type { Request, Response } from "express";
import { Contact } from "../models/Contact.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const submitContact = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, company, message } = req.body;
  await Contact.create({ name, email, company: company ?? "", message, userId: (req as Request & { userId?: string }).userId });
  res.status(201).json({ ok: true, message: "Thanks! We'll reply within 24 hours." });
});

export const listContacts = asyncHandler(async (_req: Request, res: Response) => {
  const contacts = await Contact.find().sort({ createdAt: -1 }).limit(50);
  res.json({ data: contacts.map(c => ({ id: c.id, name: c.name, email: c.email, message: c.message, company: c.company, status: c.status, createdAt: c.get("createdAt"), callRequest: c.callRequest })) });
});

export const scheduleCall = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, company, phone, preferredDate, preferredTime, timeZone, service, message } = req.body;
  const inquiry = await Contact.create({
    name, email, company: company ?? "", message,
    callRequest: { preferredDate, preferredTime, timeZone, service, phone: phone ?? "" },
  });
  res.status(201).json({ ok: true, id: inquiry.id, message: "Call request received. Our team will contact you to confirm the time." });
});

export const updateContactStatus = asyncHandler(async (req: Request, res: Response) => {
  const record = await Contact.findByIdAndUpdate(req.params.id, { $set: { status: req.body.status } }, { new: true, runValidators: true });
  if (!record) { res.status(404).json({ message: "Record not found." }); return; }
  res.json({ id: record.id, status: record.status });
});
