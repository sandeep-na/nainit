import { Router } from "express";
import { body } from "express-validator";
import { login, me } from "../controllers/auth.controller.js";
import { validate } from "../middleware/error.middleware.js";
import { protect, requireAdmin } from "../middleware/auth.middleware.js";

const router = Router();

router.post(
  "/login",
  [body("email").isEmail().normalizeEmail(), body("password").notEmpty()],
  validate,
  login
);

router.get("/me", protect, requireAdmin, me);

export default router;
