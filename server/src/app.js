// import express from 'express';
// import helmet from 'helmet';
// import cors from 'cors';
// import morgan from 'morgan';
// import compression from 'compression';
// import router from './routes/index.js';
// import { env } from './config/env.js';
// import { notFound, errorHandler } from './middlewares/error.js';

// const app = express();

// app.set('trust proxy', 1);
// app.use(helmet());
// app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
// app.use(express.json({ limit: '20kb' }));
// app.use(compression());
// app.use(morgan('dev'));

// app.use('/api', router);

// app.use(notFound);
// app.use(errorHandler);

// export default app;

// server/src/app.js
import express from "express";
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
app.use(cors({ origin: env.CORS_ORIGIN || ["http://localhost:5173"], credentials: true }));
app.use(express.json({ limit: "20kb" }));
app.use(compression());
app.use(morgan("dev"));

// helpers for Home.jsx
app.get("/api/health", (req, res) => res.sendStatus(200));
app.get("/api/stats", (req, res) => res.json({
  "APIs shipped": "24+",
  "Prod uptime": "99.9%",
  "Peak QPS": "12k+",
  "Audited routes": "450+",
}));
app.get("/api/projects", (req, res) => res.json([])); // UI uses local fallback

// your app routes
app.use("/api", router);

app.use(notFound);
app.use(errorHandler);

export default app;
