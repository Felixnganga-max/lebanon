import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

/**
 * Handles submitting a student application to the backend.
 * POSTs to /api/applications, which emails both the applicant and
 * the admissions inbox (no database record — see backend mailer.js).
 */
export default function useApplications() {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function submitApplication(payload) {
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch(`${API_URL}/api/applications`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to submit application.");
      }

      return true;
    } catch (err) {
      setError(
        err.message ||
          "Something went wrong submitting your application. Please try again.",
      );
      return false;
    } finally {
      setSubmitting(false);
    }
  }

  return { submitApplication, submitting, error };
}
