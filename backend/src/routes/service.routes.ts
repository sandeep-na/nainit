import { Router } from "express";
import { listServices, getService } from "../controllers/service.controller.js";

const router = Router();
router.get("/", listServices);
router.get("/:slug", getService);

export default router;
