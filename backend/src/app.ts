import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";
import serviceRoutes from "./routes/service.routes.js";
import industryRoutes from "./routes/industry.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import applicationRoutes from "./routes/application.routes.js";
import { errorHandler, notFound } from "./middleware/error.middleware.js";

const app = express();

app.use(helmet());
app.use(cors({ origin: (process.env.FRONTEND_URL ?? "http://localhost:3000").split(","), credentials: true }));
app.use(express.json({ limit: "100kb" }));
app.use(morgan("dev"));

app.get("/health", (_req, res) => res.json({ ok: true, service: "nainit-api" }));
app.use("/api/auth", authRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/industries", industryRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/applications", applicationRoutes);

app.use("/api", notFound);
app.use(errorHandler);

export default app;
