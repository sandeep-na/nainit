import { Router, type Request, type Response, type NextFunction } from "express";
import { body, param } from "express-validator";
import { submitContact, listContacts, scheduleCall, updateContactStatus } from "../controllers/contact.controller.js";
import { validate } from "../middleware/error.middleware.js";

import { protect, requireAdmin } from "../middleware/auth.middleware.js";

import { callTimeZones, callTimes, callServices, isFutureCall } from "../utils/call-request.js";

const router = Router();
router.get("/", protect, requireAdmin, listContacts);

router.post(
  "/schedule",
  [
    body("name").isString().bail().trim().isLength({ min: 2, max: 80 }).withMessage("Name must be 2–80 characters"),
    body("email").isString().bail().trim().isLength({ max: 254 }).isEmail().normalizeEmail().withMessage("Valid email is required"),
    body("company").optional().isString().bail().trim().isLength({ max: 120 }),
    body("phone").optional({ values: "falsy" }).isString().bail().matches(/^[+]?[\d\s\-()]{7,16}$/).withMessage("Enter a valid phone number"),
    body("message").isString().bail().trim().isLength({ min: 10, max: 2000 }).withMessage("Project details must be 10–2000 characters"),
    body("service").isIn(callServices).withMessage("Choose a valid discussion topic"),
    body("timeZone").isIn(callTimeZones).withMessage("Choose a supported time zone"),
    body("preferredTime").isIn(callTimes).withMessage("Choose a valid start time"),
    body("preferredDate").custom((date, { req }) => isFutureCall(date, req.body.preferredTime, req.body.timeZone)).withMessage("Choose a valid future date and time in your selected time zone"),
  ],
  validate,
  scheduleCall
);

router.post(
  "/",
  [
    body("name").trim().isLength({ min: 2 }).withMessage("Name is required"),
    body("email").isEmail().normalizeEmail().withMessage("Valid email is required"),
    body("message").trim().isLength({ min: 10 }).withMessage("Message must be 10+ characters"),
  ],
  validate,
  (req: Request, res: Response, next: NextFunction) => req.headers.authorization ? protect(req, res, next) : next(),
  submitContact
);

router.patch("/:id", protect, requireAdmin,
  [param("id").isMongoId().withMessage("Invalid record ID"), body("status").isIn(["new", "replied", "archived"]).withMessage("Invalid status")],
  validate, updateContactStatus
);

export default router;
