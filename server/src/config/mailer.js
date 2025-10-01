// import nodemailer from 'nodemailer';
// import { env } from './env.js';

// export const transporter = nodemailer.createTransport({
//   host: env.SMTP_HOST,
//   port: env.SMTP_PORT,
//   secure: env.SMTP_SECURE,
//   pool: true,
//   maxConnections: 3,
//   maxMessages: 100,
//   auth: env.SMTP_USER && env.SMTP_PASS ? { user: env.SMTP_USER, pass: env.SMTP_PASS } : undefined,
//   tls: { minVersion: 'TLSv1.2' }
// });

// export async function verifyTransporter() {
//   if (!env.SMTP_HOST) {
//     throw new Error('Missing SMTP_HOST in env');
//   }
//   await transporter.verify();
// }

// export const MAIL_DEFAULTS = { from: env.MAIL_FROM, to: env.MAIL_TO };

// server/src/config/mailer.js
import nodemailer from "nodemailer";
import { env } from "./env.js";
import { log } from "./logger.js";

const DEV_LOGGER = {
  async sendMail(msg) {
    log.warn("[MAIL DEV] No valid SMTP configured. Logging email instead:");
    log.warn(JSON.stringify(msg, null, 2));
    return { messageId: "dev-log" };
  },
};

let transporter = null;
let usingDevFallback = false;

function isSmtpConfigured() {
  const host = (env.SMTP_HOST || "").trim();
  return (
    host &&
    host !== "smtp.example.com" && // prevent placeholder from trying DNS
    !!env.SMTP_USER &&
    !!env.SMTP_PASS
  );
}

function createTransport() {
  if (isSmtpConfigured()) {
    return nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: Number(env.SMTP_PORT || 587),
      secure: String(env.SMTP_PORT) === "465",
      auth: { user: env.SMTP_USER, pass: env.SMTP_PASS },
    });
  }
  usingDevFallback = true;
  return DEV_LOGGER;
}

export async function verifyTransporter() {
  transporter = createTransport();

  if (usingDevFallback) {
    log.warn(
      "SMTP not configured (or placeholder detected). Using dev logger transport; emails will be printed to the console."
    );
    return false;
  }

  try {
    if (transporter.verify) {
      await transporter.verify();
    }
    log.info("SMTP transporter verified.");
    return true;
  } catch (e) {
    log.warn(
      `SMTP verify failed (${e?.code || e?.message}). Falling back to dev logger transport.`
    );
    transporter = DEV_LOGGER;
    usingDevFallback = true;
    return false;
  }
}

export async function sendMailSafe(options) {
  if (!transporter) {
    await verifyTransporter();
  }
  try {
    const info = await transporter.sendMail(options);
    return info;
  } catch (e) {
    // Any runtime failure -> fall back and still succeed in dev
    log.warn(
      `sendMail failed (${e?.code || e?.message}). Falling back to dev logger transport.`
    );
    transporter = DEV_LOGGER;
    usingDevFallback = true;
    const info = await transporter.sendMail(options);
    return info;
  }
}
