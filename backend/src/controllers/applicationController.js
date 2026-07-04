import {
  sendMail,
  applicationReceivedEmail,
  adminNotificationEmail,
} from "../utils/mailer.js";

const ADMIN_EMAIL = process.env.SMTP_USER; // admissions@lebanonttc.co.ke

/**
 * Handles a new student application submission.
 * No database is used — the application "record" lives entirely in the
 * two emails sent below: one confirmation to the applicant, one
 * notification to the admissions inbox.
 */
export async function submitApplication(req, res) {
  try {
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
      school,
      program,
    } = req.body;

    // Required fields — must match Step 2 validation on the frontend (Apply.jsx)
    if (!firstName || !lastName || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: "First name, last name, email, and phone are required.",
      });
    }

    if (!program) {
      return res.status(400).json({
        success: false,
        message: "No program was selected.",
      });
    }

    const applicantEmail = applicationReceivedEmail({ studentName: firstName });

    const adminEmail = adminNotificationEmail({
      type: "application",
      data: {
        "Full Name": `${firstName} ${lastName}`,
        Email: email,
        Phone: `+254 ${phone}`,
        School: school || "—",
        Program: program,
        "ID / Passport": idNumber,
        County: county,
        Employer: employer,
        "Heard via": heard,
        Motivation: motivation,
      },
    });

    // Send both emails in parallel. If either fails, the catch block below
    // reports failure to the frontend so the applicant knows to retry.
    await Promise.all([
      sendMail({
        to: email,
        subject: applicantEmail.subject,
        html: applicantEmail.html,
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
      message: "Application submitted successfully.",
    });
  } catch (err) {
    console.error(
      "[applicationController] submitApplication error:",
      err.message,
    );
    return res.status(500).json({
      success: false,
      message:
        "Something went wrong submitting your application. Please try again.",
    });
  }
}
