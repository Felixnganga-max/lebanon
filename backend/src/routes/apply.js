import express from "express";
import { sendMail } from "../utils/mailer.js";

const router = express.Router();
const ADMISSIONS_EMAIL = "admissions@lebanonttc.co.ke";

router.post("/apply", async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    idNumber,
    county,
    employer,
    motivation,
    heard,
    program,
    school,
  } = req.body;

  if (!firstName || !lastName || !email || !phone || !program) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  try {
    // 1. Notify the admissions inbox
    await sendMail({
      to: ADMISSIONS_EMAIL,
      subject: `New Application: ${program}`,
      replyTo: email,
      html: `
        <h2 style="font-family:sans-serif;color:#0f1a5c;">New Application Received</h2>
        <table style="font-family:sans-serif;font-size:14px;color:#1e2a6e;border-collapse:collapse;">
          <tr><td style="padding:4px 12px 4px 0;color:#8a96c4;">Program</td><td><strong>${program}</strong></td></tr>
          <tr><td style="padding:4px 12px 4px 0;color:#8a96c4;">School</td><td>${school || "—"}</td></tr>
          <tr><td style="padding:4px 12px 4px 0;color:#8a96c4;">Name</td><td>${firstName} ${lastName}</td></tr>
          <tr><td style="padding:4px 12px 4px 0;color:#8a96c4;">Email</td><td>${email}</td></tr>
          <tr><td style="padding:4px 12px 4px 0;color:#8a96c4;">Phone</td><td>+254 ${phone}</td></tr>
          <tr><td style="padding:4px 12px 4px 0;color:#8a96c4;">ID / Passport</td><td>${idNumber || "—"}</td></tr>
          <tr><td style="padding:4px 12px 4px 0;color:#8a96c4;">County</td><td>${county || "—"}</td></tr>
          <tr><td style="padding:4px 12px 4px 0;color:#8a96c4;">Employer</td><td>${employer || "—"}</td></tr>
          <tr><td style="padding:4px 12px 4px 0;color:#8a96c4;">Heard via</td><td>${heard || "—"}</td></tr>
        </table>
        <p style="font-family:sans-serif;font-size:14px;color:#1e2a6e;"><strong>Motivation:</strong><br/>${motivation || "—"}</p>
      `,
    });

    // 2. Confirm to the applicant — this is what "assures" the user
    await sendMail({
      to: email,
      subject: "We've received your application — Lebanon TTC",
      html: `
        <div style="font-family:sans-serif;color:#1e2a6e;max-width:480px;">
          <p>Hi ${firstName},</p>
          <p>Thanks for applying to <strong>${program}</strong> at Lebanon Technical Training College.</p>
          <p>Our admissions team will review your application and reach out within
          <strong>24 hours</strong> at this email or by phone.</p>
          <p>If anything is urgent, call us on
          <strong>+254 105 221 148</strong> or <strong>+254 759 810 287</strong>.</p>
          <p style="margin-top:24px;">— Lebanon TTC Admissions</p>
        </div>
      `,
    });

    res.json({ success: true });
  } catch (err) {
    console.error("[apply route] email error:", err);
    res.status(500).json({
      error:
        "Could not send your application. Please try again or call us directly.",
    });
  }
});

export default router;
