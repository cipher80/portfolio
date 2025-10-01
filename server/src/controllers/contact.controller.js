// import { sendContactNotification } from '../services/mail.service.js';

// export const submitContact = async (req, res, next) => {
//   try {
//     const { name, email, mobile } = req.body;
//     await sendContactNotification({ name, email, mobile });
//     res.status(200).json({ success: true, message: 'Thanks! Your details were sent successfully.' });
//   } catch (err) {
//     next(err);
//   }
// };


// server/src/controllers/contact.controller.js
import { env } from "../config/env.js";
import { sendMailSafe } from "../config/mailer.js";

export async function submitContact(req, res) {
  try {
    const {
      type = "contact",
      name,
      email,
      mobile,
      message,
      datetime,
      company, // honeypot
    } = req.body || {};

    if (company) return res.json({ ok: true }); // bot trap

    if (!name || !email) {
      return res
        .status(400)
        .json({ ok: false, error: "Name and email are required" });
    }
    if (type === "call" && !datetime) {
      return res
        .status(400)
        .json({ ok: false, error: "datetime is required for booking" });
    }

    const subject = type === "call" ? "New Call Request" : "New Contact Message";
    const html = `
      <h2>${subject}</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      ${mobile ? `<p><strong>Mobile:</strong> ${mobile}</p>` : ""}
      ${datetime ? `<p><strong>Preferred time (local):</strong> ${datetime}</p>` : ""}
      ${message ? `<p><strong>Message:</strong><br/>${String(message).replace(/\n/g, "<br/>")}</p>` : ""}
    `;

    await sendMailSafe({
      from: env.CONTACT_FROM || "no-reply@yourdomain.com",
      to: env.CONTACT_TO || env.SMTP_USER || "you@example.com",
      replyTo: email,
      subject,
      html,
    });

    return res.json({ ok: true });
  } catch (err) {
    // Should be rare because sendMailSafe falls back, but keep a guard:
    console.error("submitContact fatal error:", err);
    return res.status(500).json({ ok: false, error: "Mail send failed" });
  }
}

