import "dotenv/config";
import app from "./app.js";
import { connectDB } from "./config/db.js";
const PORT = Number(process.env.PORT ?? 5050);

connectDB(process.env.MONGO_URI ?? "")
  .then(() => app.listen(PORT, () => console.log(`API running on :${PORT}`)))
  .catch((err) => {
    console.error("DB connection failed:", err.message);
    process.exit(1);
  });
