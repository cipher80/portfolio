import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import morgan from "morgan";

import router from "./routes/index.js";
import { notFound, errorHandler } from "./middlewares/error.js";

const app = express();

app.set("trust proxy", 1);
app.use(helmet());
app.use(cors({ origin: "*", credentials: true }));
app.use(express.json({ limit: "20kb" }));
app.use(compression());
app.use(morgan("dev"));

// ✅ API routes first
app.use("/api", router);

// ✅ Static frontend
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.join(__dirname, "../dist");

app.use(express.static(distPath));

// ✅ React Router fallback (important: must be AFTER /api routes)
app.get("*", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

// ❌ These must come LAST
app.use(notFound);
app.use(errorHandler);

export default app;
