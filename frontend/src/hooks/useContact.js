import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "https://lebanon-hnwi.vercel.app";

/**
 * Handles submitting a "Contact Us" message to the backend.
 * POSTs to /api/contact, which emails both the visitor and
 * the admissions inbox (no database record — see backend mailer.js).
 */
export default function useContact() {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function submitContact(payload) {
    setSubmitting(true);
    setError("");

    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to send message.");
      }

      return true;
    } catch (err) {
      setError(
        err.message ||
          "Something went wrong sending your message. Please try again.",
      );
      return false;
    } finally {
      setSubmitting(false);
    }
  }

  return { submitContact, submitting, error };
}
