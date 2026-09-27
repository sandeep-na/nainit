import type { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

/** Returns 400 with readable messages when express-validator fails. */
export function validate(req: Request, res: Response, next: NextFunction) {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();
  return res.status(400).json({
    message: "Validation failed",
    errors: errors.array().map((e) => ({ field: e.type === "field" ? (e as { path: string }).path : "body", message: e.msg })),
  });
}

/** Central error handler — always last in the chain. */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction) {
  console.error(err);
  const status = (err as Error & { statusCode?: number }).statusCode ?? 500;
  res.status(status).json({
    message: status === 500 ? "Something went wrong — please try again." : err.message,
  });
}

/** 404 for unknown API routes. */
export function notFound(_req: Request, res: Response) {
  res.status(404).json({ message: "Route not found" });
}
