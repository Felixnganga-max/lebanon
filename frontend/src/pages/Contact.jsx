import { useState } from "react";
import useContact from "../hooks/useContact"; // adjust path to wherever you save the hook

const faqs = [
  {
    q: "What programs does Lebanon TTC offer?",
    a: "Lebanon TTC offers a wide range of NITA-accredited programs across 7 categories including Digital & Tech, Data & Analytics, Leadership & Management, Compliance & Safety, NGO & Development, Business, and Specialized tracks.",
  },
  {
    q: "Is learning fully online?",
    a: "Yes. All our programs are delivered online via Google Meet, giving you the flexibility to learn from anywhere in Kenya and beyond without disrupting your work or daily schedule.",
  },
  {
    q: "Are the certificates recognized?",
    a: "Absolutely. Lebanon TTC is NITA-accredited and all certificates issued are legally recognized and industry-aligned, accepted by employers, NGOs, and government agencies across East Africa.",
  },
  {
    q: "How do I apply or enroll?",
    a: "You can reach out via email at admissions@lebanonttc.co.ke or call +254 105 221 148 / +254 759 810 287. Our admissions team will guide you through program selection and registration.",
  },
  {
    q: "Do you offer group or corporate training?",
    a: "Yes. We work with organizations, NGOs, and government bodies to deliver customized group training packages. Contact us to discuss a tailored solution for your team.",
  },
  {
    q: "What are the fees and payment options?",
    a: "Program fees vary by course. We offer flexible payment plans to ensure no one is locked out of quality training. Reach out to our admissions desk for a detailed fee schedule.",
  },
  {
    q: "How long do programs take?",
    a: "Program duration ranges from short intensive courses of 1–2 weeks to longer certification programs of up to 3 months, depending on the track and level chosen.",
  },
];

export default function Contact() {
  const [openIndex, setOpenIndex] = useState(null);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const { submitContact, submitting, error } = useContact();

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ok = await submitContact(form);
    if (ok) setSubmitted(true);
  };

  return (
    <div
      style={{
        fontFamily: "'Inter', sans-serif",
        background: "#f8f9ff",
        minHeight: "100vh",
        paddingTop: "80px",
      }}
    >
      {/* ── RESPONSIVE STYLES ── */}
      <style>{`
        .ltc-hero-band {
          padding: 56px 48px 48px;
        }
        .ltc-main-grid {
          padding: 48px 48px 80px;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          align-items: start;
        }
        .ltc-form-card {
          padding: 36px 40px;
        }
        .ltc-name-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        .ltc-phone-row {
          display: flex;
          gap: 10px;
        }
        .ltc-faq-band {
          padding: 64px 48px 80px;
        }
        .ltc-faq-grid {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1.6fr;
          gap: 64px;
          align-items: start;
        }
        .ltc-faq-answer {
          padding-right: 44px;
        }
        .ltc-map-frame {
          height: 240px;
        }

        @media (max-width: 900px) {
          .ltc-main-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          .ltc-faq-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }
        }

        @media (max-width: 640px) {
          .ltc-hero-band {
            padding: 40px 20px 32px;
          }
          .ltc-main-grid {
            padding: 32px 16px 56px;
          }
          .ltc-form-card {
            padding: 28px 20px;
          }
          .ltc-name-grid {
            grid-template-columns: 1fr;
          }
          .ltc-phone-row {
            flex-wrap: wrap;
          }
          .ltc-faq-band {
            padding: 48px 16px 56px;
          }
          .ltc-faq-answer {
            padding-right: 0;
          }
          .ltc-map-frame {
            height: 200px;
          }
        }

        @media (max-width: 400px) {
          .ltc-contact-info-card {
            padding: 24px 20px !important;
          }
        }
      `}</style>

      {/* ── HERO BAND ── */}
      <div
        className="ltc-hero-band"
        style={{
          background: "#eef2ff",
          borderBottom: "1px solid #dde3f5",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <p
            style={{
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#6b7bba",
              margin: "0 0 10px",
            }}
          >
            Get in Touch
          </p>
          <h1
            style={{
              fontFamily: "'Tenor Sans', serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 400,
              color: "#0f1a5c",
              margin: "0 0 12px",
              lineHeight: 1.15,
            }}
          >
            Connecting Near and Far
          </h1>
          <p
            style={{
              fontSize: "0.9rem",
              color: "#5a6a9a",
              maxWidth: "480px",
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            Email, call, or complete the form to learn how Lebanon TTC can
            support your learning journey.
          </p>
        </div>
      </div>

      {/* ── MAIN GRID ── */}
      <div
        className="ltc-main-grid"
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* LEFT COL */}
        <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
          {/* Contact details */}
          <div
            className="ltc-contact-info-card"
            style={{
              background: "#eef2ff",
              borderRadius: "1.25rem",
              padding: "32px 36px",
              border: "1px solid #dde3f5",
            }}
          >
            <h2
              style={{
                fontSize: "1rem",
                fontWeight: 600,
                color: "#0f1a5c",
                margin: "0 0 6px",
              }}
            >
              Lebanon Technical Training College
            </h2>
            <p
              style={{
                fontSize: "0.78rem",
                color: "#6b7bba",
                margin: "0 0 24px",
              }}
            >
              NITA Accredited · Embu County, Kenya
            </p>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              {/* Location */}
              <div
                style={{
                  display: "flex",
                  gap: "14px",
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "10px",
                    background: "#111184",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#FACC15"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <p
                    style={{
                      fontSize: "0.68rem",
                      fontWeight: 700,
                      letterSpacing: "0.09em",
                      textTransform: "uppercase",
                      color: "#8a96c4",
                      margin: "0 0 3px",
                    }}
                  >
                    Location
                  </p>
                  <p
                    style={{
                      fontSize: "0.82rem",
                      color: "#1e2a6e",
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    Alpha Plaza, 2nd Floor
                    <br />
                    Kiritiri Town, Embu County, Kenya
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div
                style={{
                  display: "flex",
                  gap: "14px",
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "10px",
                    background: "#111184",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#FACC15"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.29 6.29l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div>
                  <p
                    style={{
                      fontSize: "0.68rem",
                      fontWeight: 700,
                      letterSpacing: "0.09em",
                      textTransform: "uppercase",
                      color: "#8a96c4",
                      margin: "0 0 3px",
                    }}
                  >
                    Phone
                  </p>
                  <p
                    style={{
                      fontSize: "0.82rem",
                      color: "#1e2a6e",
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    +254 105 221 148
                    <br />
                    +254 759 810 287
                  </p>
                </div>
              </div>

              {/* Email */}
              <div
                style={{
                  display: "flex",
                  gap: "14px",
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "10px",
                    background: "#111184",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#FACC15"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div>
                  <p
                    style={{
                      fontSize: "0.68rem",
                      fontWeight: 700,
                      letterSpacing: "0.09em",
                      textTransform: "uppercase",
                      color: "#8a96c4",
                      margin: "0 0 3px",
                    }}
                  >
                    Email
                  </p>
                  <a
                    href="mailto:admissions@lebanonttc.co.ke"
                    style={{
                      fontSize: "0.82rem",
                      color: "#111184",
                      textDecoration: "none",
                      fontWeight: 500,
                      wordBreak: "break-word",
                    }}
                  >
                    admissions@lebanonttc.co.ke
                  </a>
                </div>
              </div>

              {/* Mode */}
              <div
                style={{
                  display: "flex",
                  gap: "14px",
                  alignItems: "flex-start",
                }}
              >
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "10px",
                    background: "#111184",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#FACC15"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="23 7 16 12 23 17 23 7" />
                    <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                  </svg>
                </div>
                <div>
                  <p
                    style={{
                      fontSize: "0.68rem",
                      fontWeight: 700,
                      letterSpacing: "0.09em",
                      textTransform: "uppercase",
                      color: "#8a96c4",
                      margin: "0 0 3px",
                    }}
                  >
                    Mode of Learning
                  </p>
                  <p
                    style={{ fontSize: "0.82rem", color: "#1e2a6e", margin: 0 }}
                  >
                    Online · Google Meet
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Google Map */}
          <div
            style={{
              borderRadius: "1.25rem",
              overflow: "hidden",
              border: "1px solid #dde3f5",
              position: "relative",
            }}
          >
            <iframe
              className="ltc-map-frame"
              title="Lebanon TTC Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.5!2d37.6!3d-0.65!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMC42NVMgMzcuNkU!5e0!3m2!1sen!2ske!4v1234567890"
              width="100%"
              style={{ border: 0, display: "block", width: "100%" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            {/* Map label overlay */}
            <div
              style={{
                position: "absolute",
                top: "12px",
                left: "12px",
                background: "white",
                borderRadius: "10px",
                padding: "8px 14px",
                boxShadow: "0 2px 12px rgba(0,0,0,0.12)",
                display: "flex",
                flexDirection: "column",
                gap: "2px",
                maxWidth: "calc(100% - 24px)",
              }}
            >
              <p
                style={{
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  color: "#0f1a5c",
                  margin: 0,
                }}
              >
                Lebanon TTC
              </p>
              <p style={{ fontSize: "0.65rem", color: "#6b7bba", margin: 0 }}>
                Kiritiri Town, Embu County
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT COL — form */}
        <div
          className="ltc-form-card"
          style={{
            background: "white",
            borderRadius: "1.5rem",
            border: "1px solid #dde3f5",
            boxShadow: "0 4px 32px rgba(17,17,132,0.06)",
          }}
        >
          <h2
            style={{
              fontFamily: "'Tenor Sans', serif",
              fontSize: "1.9rem",
              fontWeight: 400,
              color: "#0f1a5c",
              margin: "0 0 6px",
            }}
          >
            Get in Touch
          </h2>
          <p
            style={{ fontSize: "0.8rem", color: "#8a96c4", margin: "0 0 28px" }}
          >
            You can reach us anytime
          </p>

          {submitted ? (
            <div style={{ textAlign: "center", padding: "48px 0" }}>
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "50%",
                  background: "#eef2ff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 16px",
                }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#111184"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3
                style={{
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  color: "#0f1a5c",
                  margin: "0 0 8px",
                }}
              >
                Message Sent!
              </h3>
              <p style={{ fontSize: "0.82rem", color: "#6b7bba" }}>
                Our admissions team will get back to you within 24 hours.
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              <div className="ltc-name-grid">
                <input
                  name="firstName"
                  placeholder="First name"
                  value={form.firstName}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                />
                <input
                  name="lastName"
                  placeholder="Last name"
                  value={form.lastName}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                />
              </div>
              <div style={{ position: "relative" }}>
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#8a96c4"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    position: "absolute",
                    left: "14px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    pointerEvents: "none",
                  }}
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                <input
                  name="email"
                  type="email"
                  placeholder="Your email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  style={{ ...inputStyle, paddingLeft: "40px" }}
                />
              </div>
              <div className="ltc-phone-row">
                <div
                  style={{
                    ...inputStyle,
                    width: "80px",
                    flexShrink: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "4px",
                    fontSize: "0.8rem",
                    color: "#1e2a6e",
                    cursor: "default",
                  }}
                >
                  🇰🇪 +254
                </div>
                <input
                  name="phone"
                  type="tel"
                  placeholder="Phone number"
                  value={form.phone}
                  onChange={handleChange}
                  style={{ ...inputStyle, flex: 1, minWidth: "140px" }}
                />
              </div>
              <textarea
                name="message"
                placeholder="How can we help?"
                value={form.message}
                onChange={handleChange}
                required
                rows={4}
                style={{ ...inputStyle, resize: "none", lineHeight: 1.6 }}
              />
              <button
                type="submit"
                disabled={submitting}
                style={{
                  background: "#111184",
                  color: "#fff",
                  border: "none",
                  borderRadius: "10px",
                  padding: "14px",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                  cursor: submitting ? "not-allowed" : "pointer",
                  opacity: submitting ? 0.7 : 1,
                  transition: "background 200ms",
                }}
                onMouseEnter={(e) => {
                  if (!submitting) e.currentTarget.style.background = "#0d0e6b";
                }}
                onMouseLeave={(e) => {
                  if (!submitting) e.currentTarget.style.background = "#111184";
                }}
              >
                {submitting ? "Sending..." : "Send Message"}
              </button>
              {error && (
                <p
                  style={{
                    fontSize: "0.75rem",
                    color: "#dc2626",
                    textAlign: "center",
                    margin: "-4px 0 0",
                  }}
                >
                  {error}
                </p>
              )}
              <p
                style={{
                  fontSize: "0.68rem",
                  color: "#aab4d4",
                  textAlign: "center",
                  margin: 0,
                }}
              >
                By contacting us, you agree to our{" "}
                <a
                  href="#"
                  style={{
                    color: "#111184",
                    textDecoration: "none",
                    fontWeight: 500,
                  }}
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  href="#"
                  style={{
                    color: "#111184",
                    textDecoration: "none",
                    fontWeight: 500,
                  }}
                >
                  Privacy Policy
                </a>
              </p>
            </form>
          )}
        </div>
      </div>

      {/* ── FAQ SECTION ── */}
      <div
        className="ltc-faq-band"
        style={{
          background: "#eef2ff",
          borderTop: "1px solid #dde3f5",
        }}
      >
        <div className="ltc-faq-grid">
          {/* FAQ label */}
          <div>
            <p
              style={{
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#6b7bba",
                margin: "0 0 12px",
              }}
            >
              FAQ
            </p>
            <h2
              style={{
                fontFamily: "'Tenor Sans', serif",
                fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
                fontWeight: 400,
                color: "#0f1a5c",
                lineHeight: 1.2,
                margin: "0 0 16px",
              }}
            >
              Do you have any questions for us?
            </h2>
            <p
              style={{
                fontSize: "0.82rem",
                color: "#6b7bba",
                lineHeight: 1.7,
                margin: "0 0 28px",
              }}
            >
              If there is a question you want to ask, we will be happy to answer
              it. Reach out anytime.
            </p>
            <div style={{ position: "relative" }}>
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#8a96c4"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  position: "absolute",
                  left: "14px",
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              />
              <input
                placeholder="Enter your email"
                style={{
                  ...inputStyle,
                  paddingLeft: "40px",
                  background: "white",
                  width: "100%",
                  boxSizing: "border-box",
                }}
              />
            </div>
          </div>

          {/* Accordion */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {faqs.map((faq, i) => (
              <div
                key={i}
                style={{
                  borderBottom: "1px solid #dde3f5",
                  overflow: "hidden",
                }}
              >
                <button
                  onClick={() => toggle(i)}
                  style={{
                    width: "100%",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "20px 4px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "16px",
                    textAlign: "left",
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.88rem",
                      fontWeight: 600,
                      color: "#0f1a5c",
                      lineHeight: 1.4,
                    }}
                  >
                    {faq.q}
                  </span>
                  <span
                    style={{
                      width: "28px",
                      height: "28px",
                      borderRadius: "50%",
                      background: openIndex === i ? "#111184" : "#dde3f5",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      transition: "background 200ms, transform 200ms",
                      transform:
                        openIndex === i ? "rotate(45deg)" : "rotate(0deg)",
                    }}
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={openIndex === i ? "#fff" : "#6b7bba"}
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    >
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </span>
                </button>
                {openIndex === i && (
                  <p
                    className="ltc-faq-answer"
                    style={{
                      fontSize: "0.82rem",
                      color: "#5a6a9a",
                      lineHeight: 1.75,
                      margin: "0 0 20px 0",
                    }}
                  >
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  boxSizing: "border-box",
  background: "#f4f6ff",
  border: "1px solid #dde3f5",
  borderRadius: "10px",
  padding: "12px 14px",
  fontSize: "0.82rem",
  color: "#1e2a6e",
  outline: "none",
  fontFamily: "'Inter', sans-serif",
};
