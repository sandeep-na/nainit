import { Router } from "express";
import { body, param } from "express-validator";
import { listApplications, submitApplication, updateApplicationStatus } from "../controllers/application.controller.js";
import { validate } from "../middleware/error.middleware.js";
import { protect, requireAdmin } from "../middleware/auth.middleware.js";

const router = Router();

router.post(
  "/",
  [
    body("jobSlug").trim().notEmpty().withMessage("Job reference is required"),
    body("jobTitle").trim().notEmpty().withMessage("Job title is required"),
    body("name").trim().isLength({ min: 2 }).withMessage("Please enter your full name"),
    body("email").isEmail().normalizeEmail().withMessage("Enter a valid email address"),
    body("phone").optional({ checkFalsy: true }).trim().isMobilePhone("any").withMessage("Enter a valid phone number"),
    body("link").trim().isURL({ require_protocol: true }).withMessage("Share a valid URL starting with https://"),
    body("experience").trim().notEmpty().withMessage("Please select your experience"),
    body("coverNote").optional({ checkFalsy: true }).trim().isLength({ min: 20 }).withMessage("Cover note should be 20+ characters"),
  ],
  validate,
  submitApplication
);

// Hiring-team inbox (auth required)
router.get("/", protect, requireAdmin, listApplications);

router.patch("/:id", protect, requireAdmin,
  [param("id").isMongoId().withMessage("Invalid record ID"), body("status").isIn(["new", "shortlisted", "rejected", "hired"]).withMessage("Invalid status")],
  validate, updateApplicationStatus
);

export default router;
