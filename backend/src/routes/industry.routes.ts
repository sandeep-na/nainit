import { Router } from "express";
import { listIndustries, getIndustry } from "../controllers/industry.controller.js";

const router = Router();
router.get("/", listIndustries);
router.get("/:slug", getIndustry);

export default router;
