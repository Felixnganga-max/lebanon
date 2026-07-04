import nodemailer from "nodemailer";

// SMTP settings come from env vars — never hardcode credentials.
// See .env.example for what each provider (cPanel, Google Workspace,
// Zoho, Titan) expects for SMTP_HOST / SMTP_PORT.

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST, // e.g. mail.lebanonttc.co.ke
  port: Number(process.env.SMTP_PORT) || 465,
  secure: Number(process.env.SMTP_PORT) !== 587, // true for 465, false for 587
  auth: {
    user: process.env.SMTP_USER, // admissions@lebanonttc.co.ke
    pass: process.env.SMTP_PASS,
  },
});

// Fail loudly at boot if the mailbox can't be reached, rather than
// silently dropping every form submission later.
transporter.verify((err) => {
  if (err) {
    console.error("[mailer] SMTP connection failed:", err.message);
  } else {
    console.log(`[mailer] Ready to send from ${process.env.SMTP_USER}`);
  }
});

/**
 * Send an email through the admissions mailbox.
 * @param {{to: string, subject: string, html: string, replyTo?: string}} params
 */
export async function sendMail({ to, subject, html, replyTo }) {
  return transporter.sendMail({
    from: `"Lebanon TTC Admissions" <${process.env.SMTP_USER}>`,
    to,
    subject,
    html,
    ...(replyTo ? { replyTo } : {}),
  });
}

/* ────────────────────────────────────────────────────────────────
   BRAND SHELL
   Table-based layout (email-safe), inline styles throughout since
   most inboxes (Gmail, Outlook, Apple Mail) strip <style> blocks
   or handle them inconsistently. One wrapper powers every email
   below so the brand feels consistent everywhere.
──────────────────────────────────────────────────────────────── */

const BRAND = {
  navy: "#111184",
  navyDark: "#0d0e6b",
  ink: "#1e2a6e",
  muted: "#6b7bba",
  gold: "#FACC15",
  bg: "#f4f6ff",
  card: "#ffffff",
  border: "#dde3f5",
};

// Free-to-use Unsplash photo (Vitaly Gariev — students collaborating
// around a laptop in a lecture hall). Sized + cropped via Unsplash's
// image API for a clean 1200×420 banner, quality 80, auto-format.
const HEADER_IMAGE =
  "https://images.unsplash.com/photo-1758270705290-62b6294dd044?w=1200&h=420&fit=crop&q=80&auto=format&fm=jpg";

/**
 * Wraps inner HTML in the full branded email shell: hero banner with
 * gradient-over-image header, white content card, and a navy footer
 * with contact details. Pass `eyebrow` + `heading` for the banner
 * copy and `bodyHtml` for the message-specific content.
 */
function emailShell({ eyebrow, heading, bodyHtml }) {
  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Lebanon TTC</title>
  </head>
  <body style="margin:0; padding:0; background-color:${BRAND.bg}; font-family:Arial, Helvetica, sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${BRAND.bg}; padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:600px; max-width:100%; background-color:${BRAND.card}; border-radius:16px; overflow:hidden; border:1px solid ${BRAND.border}; box-shadow:0 4px 24px rgba(17,17,132,0.08);">

            <!-- HERO BANNER -->
            <tr>
              <td style="position:relative; padding:0;">
                <!--[if mso]>
                <v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width:600px;height:220px;">
                  <v:fill type="frame" src="${HEADER_IMAGE}" color="#111184" />
                  <v:textbox inset="0,0,0,0">
                <![endif]-->
                <div style="background-image:url('${HEADER_IMAGE}'); background-size:cover; background-position:center; background-color:${BRAND.navy};">
                  <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="background:linear-gradient(180deg, rgba(17,17,132,0.55) 0%, rgba(13,14,60,0.92) 100%); padding:36px 40px 28px;">
                        <table role="presentation" cellpadding="0" cellspacing="0">
                          <tr>
                            <td style="width:34px; height:34px; background-color:${BRAND.gold}; border-radius:8px; text-align:center; vertical-align:middle;">
                              <span style="font-family:Georgia, serif; font-size:16px; font-weight:bold; color:${BRAND.navy};">L</span>
                            </td>
                            <td style="padding-left:10px; font-size:13px; font-weight:bold; letter-spacing:0.08em; color:#ffffff; text-transform:uppercase;">
                              Lebanon TTC
                            </td>
                          </tr>
                        </table>
                        <p style="margin:22px 0 4px; font-size:11px; font-weight:700; letter-spacing:0.14em; text-transform:uppercase; color:${BRAND.gold};">
                          ${eyebrow}
                        </p>
                        <h1 style="margin:0; font-family:Georgia, 'Times New Roman', serif; font-weight:400; font-size:26px; line-height:1.25; color:#ffffff;">
                          ${heading}
                        </h1>
                      </td>
                    </tr>
                  </table>
                </div>
                <!--[if mso]>
                  </v:textbox>
                </v:rect>
                <![endif]-->
              </td>
            </tr>

            <!-- BODY -->
            <tr>
              <td style="padding:36px 40px 8px;">
                ${bodyHtml}
              </td>
            </tr>

            <!-- SIGNATURE -->
            <tr>
              <td style="padding:0 40px 36px;">
                <p style="margin:24px 0 0; font-size:13px; color:${BRAND.ink}; line-height:1.6;">
                  Warm regards,<br/>
                  <strong>Lebanon TTC Admissions Team</strong>
                </p>
              </td>
            </tr>

            <!-- DIVIDER -->
            <tr>
              <td style="padding:0 40px;">
                <div style="border-top:1px solid ${BRAND.border};"></div>
              </td>
            </tr>

            <!-- FOOTER -->
            <tr>
              <td style="background-color:${BRAND.navy}; padding:28px 40px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td>
                      <p style="margin:0 0 4px; font-size:13px; font-weight:700; color:#ffffff;">
                        Lebanon Technical Training College
                      </p>
                      <p style="margin:0 0 14px; font-size:11px; color:#aab4e0;">
                        NITA Accredited · Embu County, Kenya
                      </p>
                      <p style="margin:0; font-size:12px; color:#c7cef2; line-height:1.8;">
                        Alpha Plaza, 2nd Floor, Kiritiri Town, Embu County&nbsp;&nbsp;·&nbsp;&nbsp;
                        +254 105 221 148&nbsp;&nbsp;·&nbsp;&nbsp;
                        <a href="mailto:admissions@lebanonttc.co.ke" style="color:${BRAND.gold}; text-decoration:none;">admissions@lebanonttc.co.ke</a>
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>

          <p style="margin:20px 0 0; font-size:11px; color:${BRAND.muted}; text-align:center;">
            You're receiving this email because of an interaction with Lebanon TTC.
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>
`;
}

/* ────────────────────────────────────────────────────────────────
   TEMPLATES
──────────────────────────────────────────────────────────────── */

/**
 * Email sent to a student right after they submit an application.
 * @param {{studentName: string, applicationId?: string}} params
 */
export function applicationReceivedEmail({ studentName, applicationId }) {
  const bodyHtml = `
    <p style="margin:0 0 16px; font-size:14px; color:${BRAND.ink};">Dear ${studentName},</p>
    <p style="margin:0 0 16px; font-size:14px; color:${BRAND.ink}; line-height:1.7;">
      Thank you for applying to Lebanon TTC. We've successfully received your application${
        applicationId
          ? ` — reference <strong style="color:${BRAND.navy};">${applicationId}</strong>`
          : ""
      }.
    </p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${BRAND.bg}; border-radius:10px; margin:0 0 16px;">
      <tr>
        <td style="padding:16px 18px; font-size:13px; color:${BRAND.ink}; line-height:1.7;">
          Our admissions team will review your details and respond within <strong>24 hours</strong>. If we need any additional documents, we'll reach out by email.
        </td>
      </tr>
    </table>
    <p style="margin:0; font-size:14px; color:${BRAND.ink}; line-height:1.7;">
      Questions in the meantime? Just reply to this email or call us on +254 105 221 148 / +254 759 810 287.
    </p>
  `;

  return {
    subject: "We've received your application — Lebanon TTC",
    html: emailShell({
      eyebrow: "Application Update",
      heading: "Your application has landed safely.",
      bodyHtml,
    }),
  };
}

/**
 * Email sent to a visitor right after they submit the Contact Us form.
 * @param {{firstName: string}} params
 */
export function contactReceivedEmail({ firstName }) {
  const bodyHtml = `
    <p style="margin:0 0 16px; font-size:14px; color:${BRAND.ink};">Dear ${firstName},</p>
    <p style="margin:0 0 16px; font-size:14px; color:${BRAND.ink}; line-height:1.7;">
      Thanks for reaching out to Lebanon TTC. We've received your message and our admissions team will get back to you within <strong>24 hours</strong>.
    </p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:${BRAND.bg}; border-radius:10px; margin:0 0 16px;">
      <tr>
        <td style="padding:16px 18px; font-size:13px; color:${BRAND.ink}; line-height:1.7;">
          In the meantime, feel free to explore our NITA-accredited programs across Digital & Tech, Data & Analytics, Leadership & Management, and more — all delivered online via Google Meet.
        </td>
      </tr>
    </table>
    <p style="margin:0; font-size:14px; color:${BRAND.ink}; line-height:1.7;">
      If it's urgent, call us on +254 105 221 148 or +254 759 810 287.
    </p>
  `;

  return {
    subject: "We've received your message — Lebanon TTC",
    html: emailShell({
      eyebrow: "Message Received",
      heading: "Thanks for reaching out to us.",
      bodyHtml,
    }),
  };
}

/**
 * Internal notification email sent to the admissions mailbox whenever a
 * new application or contact-form submission comes in.
 * @param {{type: "application" | "contact", data: Record<string, string>}} params
 */
export function adminNotificationEmail({ type, data }) {
  const rows = Object.entries(data)
    .map(
      ([key, value]) => `
        <tr>
          <td style="padding:10px 14px; font-size:12px; font-weight:700; color:${BRAND.navy}; background-color:${BRAND.bg}; border-bottom:1px solid ${BRAND.border}; white-space:nowrap; width:130px;">
            ${key}
          </td>
          <td style="padding:10px 14px; font-size:13px; color:${BRAND.ink}; border-bottom:1px solid ${BRAND.border};">
            ${value || "—"}
          </td>
        </tr>`,
    )
    .join("");

  const isApplication = type === "application";

  const bodyHtml = `
    <p style="margin:0 0 18px; font-size:14px; color:${BRAND.ink}; line-height:1.7;">
      ${
        isApplication
          ? "A new student application just came in. Details below:"
          : "A new contact form submission just came in. Details below:"
      }
    </p>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid ${BRAND.border}; border-radius:10px; overflow:hidden; margin-bottom:8px;">
      ${rows}
    </table>
  `;

  return {
    subject: isApplication
      ? "🎓 New Application Received"
      : "📩 New Contact Form Submission",
    html: emailShell({
      eyebrow: isApplication ? "Admissions Alert" : "Inbox Alert",
      heading: isApplication
        ? "New application received."
        : "New message from the website.",
      bodyHtml,
    }),
  };
}

export default transporter;
