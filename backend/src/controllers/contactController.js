import {
  sendMail,
  contactReceivedEmail,
  adminNotificationEmail,
} from "../utils/mailer.js";

const ADMIN_EMAIL = process.env.SMTP_USER; // admissions@lebanonttc.co.ke

/**
 * Handles a new "Contact Us" form submission.
 * No database is used — the message "record" lives entirely in the
 * two emails sent below: one confirmation to the visitor, one
 * notification to the admissions inbox.
 */
export async function submitContact(req, res) {
  try {
    const { firstName, lastName, email, phone, message } = req.body;

    // Required fields — must match Contact.jsx form validation
    if (!firstName || !lastName || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "First name, last name, email, and message are required.",
      });
    }

    const visitorEmail = contactReceivedEmail({ firstName });

    const adminEmail = adminNotificationEmail({
      type: "contact",
      data: {
        "Full Name": `${firstName} ${lastName}`,
        Email: email,
        Phone: phone ? `+254 ${phone}` : "—",
        Message: message,
      },
    });

    await Promise.all([
      sendMail({
        to: email,
        subject: visitorEmail.subject,
        html: visitorEmail.html,
      }),
      sendMail({
        to: ADMIN_EMAIL,
        subject: adminEmail.subject,
        html: adminEmail.html,
        replyTo: email,
      }),
    ]);

    return res.status(201).json({
      success: true,
      message: "Message sent successfully.",
    });
  } catch (err) {
    console.error("[contactController] submitContact error:", err.message);
    return res.status(500).json({
      success: false,
      message: "Something went wrong sending your message. Please try again.",
    });
  }
}
