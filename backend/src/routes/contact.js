import express from "express";
import { sendMail } from "../utils/mailer.js";

const router = express.Router();
const ADMISSIONS_EMAIL = "admissions@lebanonttc.co.ke";

router.post("/contact", async (req, res) => {
  const { firstName, lastName, email, phone, message } = req.body;

  if (!firstName || !lastName || !email || !message) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  try {
    // 1. Notify the admissions inbox
    await sendMail({
      to: ADMISSIONS_EMAIL,
      subject: `New Contact Form Message from ${firstName} ${lastName}`,
      replyTo: email,
      html: `
        <h2 style="font-family:sans-serif;color:#0f1a5c;">New Contact Message</h2>
        <table style="font-family:sans-serif;font-size:14px;color:#1e2a6e;border-collapse:collapse;">
          <tr><td style="padding:4px 12px 4px 0;color:#8a96c4;">Name</td><td>${firstName} ${lastName}</td></tr>
          <tr><td style="padding:4px 12px 4px 0;color:#8a96c4;">Email</td><td>${email}</td></tr>
          <tr><td style="padding:4px 12px 4px 0;color:#8a96c4;">Phone</td><td>${phone ? `+254 ${phone}` : "—"}</td></tr>
        </table>
        <p style="font-family:sans-serif;font-size:14px;color:#1e2a6e;"><strong>Message:</strong><br/>${message}</p>
      `,
    });

    // 2. Confirm to the sender
    await sendMail({
      to: email,
      subject: "We've received your message — Lebanon TTC",
      html: `
        <div style="font-family:sans-serif;color:#1e2a6e;max-width:480px;">
          <p>Hi ${firstName},</p>
          <p>Thanks for reaching out to Lebanon Technical Training College. We've received
          your message and our admissions team will get back to you within
          <strong>24 hours</strong>.</p>
          <p>If it's urgent, call us on
          <strong>+254 105 221 148</strong> or <strong>+254 759 810 287</strong>.</p>
          <p style="margin-top:24px;">— Lebanon TTC Admissions</p>
        </div>
      `,
    });

    res.json({ success: true });
  } catch (err) {
    console.error("[contact route] email error:", err);
    res.status(500).json({
      error:
        "Could not send your message. Please try again or call us directly.",
    });
  }
});

export default router;
