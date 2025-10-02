

// server/src/app.js
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import compression from "compression";

import router from "./routes/index.js";
import { env } from "./config/env.js";
import { notFound, errorHandler } from "./middlewares/error.js";

const app = express();

app.set("trust proxy", 1);
app.use(helmet());
app.use(cors({ origin: env.CORS_ORIGIN || "*", credentials: true }));
app.use(express.json({ limit: "20kb" }));
app.use(compression());
app.use(morgan("dev"));

// --- helper endpoints used by Home.jsx (optional) ---
app.get("/api/health", (_req, res) => res.sendStatus(200));
app.get("/api/stats", (_req, res) =>
  res.json({
    "APIs shipped": "24+",
    "Prod uptime": "99.9%",
    "Peak QPS": "12k+",
    "Audited routes": "450+",
  })
);
app.get("/api/projects", (_req, res) => res.json([])); // UI uses local fallback

// --- your real API ---
app.use("/api", router);

// --- serve React build from server/dist ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.resolve(__dirname, "..", "dist");

// Serve static assets (without auto index.html)
app.use(express.static(distPath, { index: false }));

// React Router fallback for any non-API route
app.get(/^\/(?!api).*/, (req, res, next) => {
  res.sendFile(path.join(distPath, "index.html"), (err) => {
    if (err) next(err);
  });
});

// --- error handlers LAST ---
app.use(notFound);
app.use(errorHandler);

export default app;

