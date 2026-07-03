import { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  ChevronDown,
  ExternalLink,
  BookOpen,
} from "lucide-react";
import { assets } from "../assets/assets";
import useApplications from "../hooks/useApplications";

const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Tenor+Sans&family=Inter:wght@400;500;600;700&display=swap');

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes checkPop {
    0%   { transform: scale(0) rotate(-20deg); }
    60%  { transform: scale(1.2) rotate(5deg); }
    100% { transform: scale(1) rotate(0); }
  }
  @keyframes float {
    0%,100% { transform: translateY(0); }
    50%      { transform: translateY(-7px); }
  }
  @keyframes confetti-fall {
    0%   { transform: translateY(-10px) rotate(0deg); opacity:1; }
    100% { transform: translateY(90px) rotate(720deg); opacity:0; }
  }
  @keyframes pulse-gold {
    0%   { box-shadow: 0 0 0 0 rgba(250,204,21,0.6); }
    70%  { box-shadow: 0 0 0 12px rgba(250,204,21,0); }
    100% { box-shadow: 0 0 0 0 rgba(250,204,21,0); }
  }

  *, *::before, *::after { box-sizing: border-box; }

  .apply-wrap {
    min-height: 100vh;
    background: #f0f3ff;
    font-family: 'Inter', sans-serif;
  }

  /* ── HERO ── */
  .hero {
    position: relative;
    height: 80vh;
    min-height: 460px;
    overflow: hidden;
  }
  .hero-img {
    position: absolute; inset: 0;
    width: 100%; height: 100%;
    object-fit: cover;
    object-position: center 30%;
  }
  .hero-scrim {
    position: absolute; inset: 0;
    background: linear-gradient(to bottom,
      rgba(8,10,72,0.55) 0%,
      rgba(8,10,72,0.3) 40%,
      rgba(8,10,72,0.72) 100%
    );
  }
  .hero-content {
    position: absolute; inset: 0;
    display: flex; flex-direction: column;
    justify-content: flex-end;
    padding: 0 64px 60px;
    max-width: 900px;
  }
  .hero-eyebrow {
    font-size: 0.65rem; font-weight: 700;
    letter-spacing: 0.18em; text-transform: uppercase;
    color: rgba(250,204,21,0.85); margin: 0 0 14px;
  }
  .hero-h1 {
    font-family: 'Tenor Sans', serif;
    font-size: clamp(2.2rem, 6.5vw, 4rem);
    font-weight: 400; color: #fff;
    margin: 0 0 20px; line-height: 1.08;
  }
  .hero-progress {
    display: flex; align-items: center; gap: 14px;
    max-width: 340px;
  }
  .hero-track {
    flex: 1; height: 2px;
    background: rgba(255,255,255,0.2); overflow: hidden;
  }
  .hero-fill {
    height: 100%; background: #FACC15;
    transition: width 500ms cubic-bezier(0.34,1.56,0.64,1);
  }
  .hero-step-label {
    font-size: 0.65rem; color: rgba(255,255,255,0.45);
    font-weight: 600; white-space: nowrap;
  }

  /* ── STEP BAR ── */
  .step-bar {
    background: white; border-bottom: 1px solid #e2e8f5;
    position: sticky; top: 0; z-index: 50;
  }
  .step-bar-inner {
    max-width: 900px; margin: 0 auto;
    padding: 0 48px; display: flex; align-items: center;
    overflow-x: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .step-bar-inner::-webkit-scrollbar { display: none; }
  .step-item { display: flex; align-items: center; gap: 9px; padding: 15px 0; flex-shrink: 0; }
  .step-dot {
    width: 28px; height: 28px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 0.7rem; font-weight: 700; flex-shrink: 0;
    transition: background 300ms;
  }
  .step-lbl {
    font-size: 0.7rem; font-weight: 700;
    letter-spacing: 0.07em; text-transform: uppercase;
    transition: color 300ms;
    white-space: nowrap;
  }
  .step-line {
    flex: 1; height: 2px; margin: 0 12px;
    min-width: 24px;
    transition: background 500ms;
  }

  /* ── SCHOOL GRID (full-bleed editorial masonry, sharp edges, large photos) ── */
  .school-grid-bleed {
    width: 100vw;
    position: relative;
    left: 50%;
    right: 50%;
    margin-left: -50vw;
    margin-right: -50vw;
    padding: 0 clamp(0px, 4vw, 48px);
  }
  .school-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: 230px;
    grid-auto-flow: dense;
    gap: 4px;
  }
  @media (max-width: 1100px) {
    .school-grid { grid-auto-rows: 200px; }
  }
  @media (max-width: 900px) {
    .school-grid { grid-template-columns: repeat(2, 1fr); grid-auto-rows: 200px; gap: 3px; }
    .school-card[style*="span 2"][style*="span 2"] { grid-column: span 2 !important; }
  }
  @media (max-width: 560px) {
    .school-grid { grid-template-columns: 1fr; grid-auto-rows: 260px; gap: 3px; }
    .school-card { grid-column: span 1 !important; grid-row: span 1 !important; }
  }
  .school-card {
    position: relative;
    overflow: hidden;
    cursor: pointer;
    border: 3px solid transparent;
    transition: transform 260ms cubic-bezier(0.34,1.56,0.64,1), border-color 220ms, box-shadow 260ms;
    background: #0b1060;
    outline: none;
    width: 100%;
    height: 100%;
  }
  .school-card:hover {
    transform: translateY(-6px) scale(1.01);
    box-shadow: 0 28px 60px rgba(11,16,96,0.28);
    z-index: 2;
  }
  .school-card.active {
    border-color: #FACC15;
    box-shadow: 0 0 0 5px rgba(250,204,21,0.2), 0 28px 60px rgba(11,16,96,0.22);
    animation: pulse-gold 550ms ease-out;
    z-index: 2;
  }
  .school-img {
    position: absolute; inset: 0;
    width: 100%; height: 100%;
    object-fit: cover;
    transition: transform 600ms cubic-bezier(0.25,0.46,0.45,0.94),
                filter 400ms;
    filter: brightness(0.78) saturate(0.9);
  }
  .school-card:hover .school-img {
    transform: scale(1.08);
    filter: brightness(0.88) saturate(1.1);
  }
  .school-card.active .school-img {
    filter: brightness(0.7) saturate(1);
  }
  /* Bottom name bar — no overlay on the image itself */
  .school-name-bar {
    position: absolute; bottom: 0; left: 0; right: 0;
    padding: 40px 20px 20px;
    background: linear-gradient(to top, rgba(8,10,72,0.9) 0%, transparent 100%);
    display: flex; align-items: flex-end; justify-content: space-between;
  }
  .school-name {
    font-family: 'Tenor Sans', serif;
    font-size: 1.1rem; font-weight: 400;
    color: #fff; line-height: 1.2;
    text-align: left;
  }
  .school-check {
    width: 28px; height: 28px; border-radius: 50%;
    background: #FACC15; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    opacity: 0; transform: scale(0.4);
    transition: opacity 200ms, transform 200ms;
    animation: none;
  }
  .school-card.active .school-check {
    opacity: 1; transform: scale(1);
    animation: checkPop 320ms ease-out;
  }

  /* ── SCHOOL SELECTION PREVIEW (appears below grid on select, sharp + large) ── */
  .school-select-preview {
    margin: 4px clamp(0px, 4vw, 48px) 0;
    overflow: hidden;
    background: #0b1060;
    display: flex;
    align-items: stretch;
    animation: fadeUp 380ms ease-out;
  }
  .school-select-preview img {
    width: 42%;
    min-width: 240px;
    height: auto;
    min-height: 220px;
    object-fit: cover;
    opacity: 0.55;
  }
  @media (max-width: 700px) {
    .school-select-preview { flex-direction: column; margin: 3px; }
    .school-select-preview img { width: 100%; min-width: 0; height: 200px; }
  }
  .school-select-preview-body {
    padding: 30px 32px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 6px;
  }

  /* ── PROGRAM LIST ── */
  .prog-list { display: flex; flex-direction: column; gap: 9px; }
  .prog-row {
    display: flex; align-items: center; justify-content: space-between; gap: 12px;
    padding: 15px 18px;
    border: 1.5px solid #dde3f5; background: white;
    cursor: pointer; outline: none; text-align: left;
    transition: all 200ms;
  }
  .prog-row:hover { border-color: #a5b4fc; background: #f5f7ff; transform: translateX(4px); }
  .prog-row.active { border-color: #111184; background: #eef2ff; box-shadow: 0 0 0 3px rgba(17,17,132,0.08); }
  .prog-row .pname { font-size: 0.87rem; font-weight: 500; color: #1e2a6e; transition: all 180ms; }
  .prog-row.active .pname { font-weight: 700; color: #111184; }
  .prog-dot {
    width: 22px; height: 22px; border-radius: 50%; flex-shrink: 0;
    background: #111184; display: flex; align-items: center; justify-content: center;
    animation: checkPop 300ms ease-out;
  }

  /* ── COURSE PREVIEW (sharp, larger image) ── */
  .course-preview {
    margin-top: 20px; overflow: hidden;
    border: 1.5px solid rgba(250,204,21,0.3);
    animation: fadeUp 360ms ease-out;
    background: #0b1060;
  }
  .course-preview img { width: 100%; height: 260px; object-fit: cover; opacity: 0.5; display: block; }
  @media (max-width: 600px) {
    .course-preview img { height: 190px; }
  }
  .course-preview-body { padding: 22px 26px 26px; }

  /* ── FORM ── */
  .field-group { display: flex; flex-direction: column; gap: 14px; }
  .field-label {
    display: block; font-size: 0.67rem; font-weight: 700;
    letter-spacing: 0.09em; text-transform: uppercase;
    color: #6b7bba; margin-bottom: 6px;
  }
  .field-input {
    width: 100%; background: white;
    border: 1.5px solid #dde3f5;
    padding: 13px 16px; font-size: 0.87rem; color: #1e2a6e;
    font-family: 'Inter', sans-serif; outline: none;
    transition: border-color 200ms, box-shadow 200ms;
  }
  .field-input:focus { border-color: #111184; box-shadow: 0 0 0 3px rgba(17,17,132,0.1); }
  .field-input::placeholder { color: #b0bade; }

  .two-col-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
  }
  @media (max-width: 560px) {
    .two-col-grid { grid-template-columns: 1fr; }
  }

  /* ── NAV ── */
  .nav-row {
    display: flex; justify-content: space-between; align-items: center;
    gap: 14px;
    margin-top: 36px; padding-top: 24px; border-top: 1px solid #dde3f5;
  }
  @media (max-width: 480px) {
    .nav-row { flex-direction: column-reverse; align-items: stretch; }
    .nav-row .btn-back, .nav-row .btn-next { justify-content: center; width: 100%; }
  }
  .btn-back {
    display: flex; align-items: center; gap: 8px;
    background: none; border: 1.5px solid #dde3f5;
    padding: 12px 22px;
    font-size: 0.8rem; font-weight: 700; color: #6b7bba;
    cursor: pointer; font-family: 'Inter', sans-serif; transition: all 180ms;
  }
  .btn-back:hover { border-color: #aab4d4; color: #3d4fa0; background: #f5f7ff; }
  .btn-next {
    display: flex; align-items: center; gap: 8px;
    border: none; padding: 13px 28px;
    font-size: 0.8rem; font-weight: 700; cursor: pointer;
    letter-spacing: 0.06em; text-transform: uppercase;
    font-family: 'Inter', sans-serif; transition: all 200ms;
  }
  .btn-next.on  { background: #111184; color: #fff; }
  .btn-next.on:hover { background: #0d0e6e; transform: translateY(-1px); box-shadow: 0 8px 24px rgba(17,17,132,0.3); }
  .btn-next.off { background: #dde3f5; color: #aab4d4; cursor: not-allowed; }
  .btn-next.loading { background: #4b56b0; color: #fff; cursor: wait; }

  /* ── REVIEW (sharp, larger image) ── */
  .review-prog-card {
    position: relative;
    overflow: hidden; margin-bottom: 18px; background: #0b1060;
  }
  .review-prog-card img { width: 100%; height: 240px; object-fit: cover; opacity: 0.38; display: block; }
  @media (max-width: 600px) {
    .review-prog-card img { height: 170px; }
  }
  .review-prog-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to bottom, transparent 30%, #0b1060 100%);
  }
  .review-prog-body { padding: 22px 28px 26px; position: relative; z-index: 2; }

  .review-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }
  @media (max-width: 560px) {
    .review-grid { grid-template-columns: 1fr; }
  }

  /* ── SUCCESS ── */
  .confetti-piece {
    position: absolute;
    animation: confetti-fall 1.4s ease-in forwards;
  }

  /* ── PREFILL BADGE ── */
  .prefill-badge {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(250,204,21,0.14);
    border: 1px solid rgba(250,204,21,0.4);
    color: #92670a;
    font-size: 0.72rem; font-weight: 700;
    padding: 7px 14px;
    margin-bottom: 18px;
  }

  /* ── CONTENT WRAP (responsive padding) ── */
  .content-wrap {
    max-width: 900px;
    margin: 0 auto;
    padding: 44px 48px 96px;
  }
  .content-wrap.step0 {
    max-width: none;
    padding: 44px 0 96px;
  }
  @media (max-width: 700px) {
    .content-wrap { padding: 32px 22px 72px; }
    .content-wrap.step0 { padding: 32px 0 72px; }
  }
  @media (max-width: 480px) {
    .content-wrap { padding: 26px 16px 60px; }
  }
`;

/* ── DATA ──
   Each category carries a `span` used to build the editorial masonry
   grid (some cards broad, some tall, deliberately uneven — Unsplash-style).
   Images are requested at higher resolution so they hold up at larger
   render sizes. */
const categories = [
  {
    id: "digital",
    label: "School of Digital & Technology",
    img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1600&q=80",
    span: { col: 2, row: 2 },
    programs: [
      "Advanced Digital Marketing",
      "Website Development Using WordPress",
      "Computer Packages & Digital Literacy",
    ],
  },
  {
    id: "data",
    label: "School of Data & Analytics",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
    span: { col: 1, row: 1 },
    programs: [
      "Data Analysis Using Advanced Excel & Power BI",
      "Data Management & Analysis Using Stata",
      "Data Management & Analysis Using R Software",
      "Statistical Package for Social Sciences (SPSS)",
      "Qualitative Data Analysis Using NVivo",
      "Qualitative Data Analysis Using QDA Miner Lite",
    ],
  },
  {
    id: "leadership",
    label: "School of Leadership & Management",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&q=80",
    span: { col: 1, row: 2 },
    programs: [
      "Leadership & Management",
      "Supervisory Skills",
      "Supervisory Leadership",
      "Transformational Leadership Development",
      "Strategic Management",
      "Performance Management",
      "Project Management",
      "Office Administration",
      "Front Office Management",
      "Executive Assistant Certificate",
    ],
  },
  {
    id: "compliance",
    label: "School of Compliance & Safety",
    img: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1600&q=80",
    span: { col: 2, row: 1 },
    programs: [
      "Certified Data Protection Officer (DPO)",
      "Child Protection & Safeguarding",
      "Occupational Safety & Health (OSH)",
      "Disaster Risk Reduction & Management",
      "Hospital Emergency Preparedness & Response",
    ],
  },
  {
    id: "ngo",
    label: "School of NGO & Development",
    img: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200&q=80",
    span: { col: 1, row: 1 },
    programs: [
      "Resource Mobilization & Proposal Writing",
      "Project M&E with Data Management",
      "Results-Based Monitoring & Evaluation",
      "Participatory Monitoring & Evaluation",
      "Project Performance Evaluation",
      "Impact Evaluation for Evidence-Based Development",
      "Budgeting & Cost Control for NGOs",
      "Accounting for NGOs Using QuickBooks",
      "Financial Management for Non-Finance Executives",
      "Analytical Decision Making",
      "Gender Mainstreaming",
      "Gender-Based Violence Training",
      "Disability Mainstreaming in Projects",
    ],
  },
  {
    id: "business",
    label: "School of Business",
    img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1600&q=80",
    span: { col: 2, row: 1 },
    programs: [
      "Entrepreneurship & Business Growth",
      "Public Speaking Course",
      "Protocol, Etiquette & Event Management",
      "QuickBooks Accounting Software Training",
      "Risk Identification & Quality Risk Management",
    ],
  },
  {
    id: "specialized",
    label: "School of Specialized Studies",
    img: "https://images.unsplash.com/photo-1532094349884-543559072ec2?w=1200&q=80",
    span: { col: 1, row: 2 },
    programs: [
      "Quantum GIS (QGIS)",
      "Church Management & Administration",
      "Youth & Children Ministry Leadership",
    ],
  },
];

const STEPS = ["School", "Program", "Details", "Review"];

function Confetti() {
  const colors = [
    "#FACC15",
    "#111184",
    "#6366f1",
    "#34d399",
    "#f472b6",
    "#fb923c",
  ];
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {Array.from({ length: 20 }, (_, i) => (
        <div
          key={i}
          className="confetti-piece"
          style={{
            left: `${Math.random() * 90 + 5}%`,
            top: "-12px",
            width: `${Math.random() * 8 + 5}px`,
            height: `${Math.random() * 8 + 5}px`,
            background: colors[i % colors.length],
            animationDelay: `${Math.random() * 0.7}s`,
          }}
        />
      ))}
    </div>
  );
}

function Field({ label, required, optional, children }) {
  return (
    <div>
      <label className="field-label">
        {label}
        {required && <span style={{ color: "#f87171", marginLeft: 3 }}>*</span>}
        {optional && (
          <span
            style={{
              color: "#aab4d4",
              fontWeight: 400,
              textTransform: "none",
              letterSpacing: 0,
            }}
          >
            {" "}
            (optional)
          </span>
        )}
      </label>
      {children}
    </div>
  );
}

export default function Apply() {
  const location = useLocation();
  const prefill = location.state || null;

  const [step, setStep] = useState(prefill ? 2 : 0);
  const [selectedCat, setSelectedCat] = useState(prefill?.schoolId ?? null);
  const [selectedProg, setSelectedProg] = useState(prefill?.program ?? null);
  const [submitted, setSubmitted] = useState(false);
  const [animKey, setAnimKey] = useState(0);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    idNumber: "",
    county: "",
    employer: "",
    motivation: "",
    heard: "",
  });

  const {
    submitApplication,
    submitting,
    error: submitError,
  } = useApplications();

  const previewRef = useRef(null);
  const courseRef = useRef(null);

  const cat = categories.find((c) => c.id === selectedCat);
  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const canNext = () => {
    if (step === 0) return !!selectedCat;
    if (step === 1) return !!selectedProg;
    if (step === 2)
      return form.firstName && form.lastName && form.email && form.phone;
    return true;
  };

  const goNext = () => {
    if (!canNext()) return;
    setAnimKey((k) => k + 1);
    setStep((s) => s + 1);
  };
  const goBack = () => {
    setAnimKey((k) => k + 1);
    setStep((s) => s - 1);
  };

  const handleSubmit = async () => {
    const ok = await submitApplication({
      ...form,
      school: cat?.label,
      program: selectedProg,
    });
    if (ok) setSubmitted(true);
  };

  // Every time the step changes (including reaching the final review/success
  // screen) bring the user back to the top of the page.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step, submitted]);

  // When a school is picked on Step 0, reveal the preview panel right below
  // the grid and scroll down just enough to bring it into view.
  useEffect(() => {
    if (step === 0 && selectedCat) {
      const t = setTimeout(() => {
        previewRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 60);
      return () => clearTimeout(t);
    }
  }, [selectedCat, step]);

  // Same behavior on Step 1: when a program is picked, reveal the course
  // preview panel below the list and scroll it into view.
  useEffect(() => {
    if (step === 1 && selectedProg) {
      const t = setTimeout(() => {
        courseRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }, 60);
      return () => clearTimeout(t);
    }
  }, [selectedProg, step]);

  const pct = (step / (STEPS.length - 1)) * 100;

  /* ── SUCCESS ── */
  if (submitted) {
    return (
      <>
        <style>{GLOBAL_CSS}</style>
        <div
          className="apply-wrap"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: 80,
          }}
        >
          <div
            style={{
              textAlign: "center",
              maxWidth: 520,
              padding: "0 24px",
              position: "relative",
            }}
          >
            <Confetti />
            <div
              style={{
                width: 88,
                height: 88,
                borderRadius: "50%",
                background: "#111184",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 28px",
                animation:
                  "float 3s ease-in-out infinite, checkPop 500ms ease-out",
              }}
            >
              <Check size={38} color="#FACC15" strokeWidth={2.5} />
            </div>
            <p
              style={{
                fontSize: "0.65rem",
                fontWeight: 700,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "#6366f1",
                margin: "0 0 10px",
              }}
            >
              🎉 Application Submitted
            </p>
            <h2
              style={{
                fontFamily: "'Tenor Sans',serif",
                fontSize: "clamp(1.7rem, 6vw, 2.2rem)",
                fontWeight: 400,
                color: "#0f1a5c",
                margin: "0 0 16px",
                lineHeight: 1.12,
              }}
            >
              You're one step closer,
              <br />
              {form.firstName}!
            </h2>
            <div
              style={{
                background: "#fff",
                padding: "20px 28px",
                border: "1.5px solid #dde3f5",
                marginBottom: 24,
              }}
            >
              <p
                style={{
                  fontSize: "0.62rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#aab4d4",
                  margin: "0 0 6px",
                }}
              >
                Your program
              </p>
              <p
                style={{
                  fontSize: "1rem",
                  fontWeight: 700,
                  color: "#111184",
                  margin: "0 0 3px",
                }}
              >
                {selectedProg}
              </p>
              <p style={{ fontSize: "0.78rem", color: "#6b7bba", margin: 0 }}>
                {cat?.label}
              </p>
            </div>
            <p
              style={{
                fontSize: "0.88rem",
                color: "#6b7bba",
                lineHeight: 1.8,
                margin: "0 0 28px",
              }}
            >
              Our admissions team will reach out to{" "}
              <strong style={{ color: "#1e2a6e" }}>{form.email}</strong> within{" "}
              <strong style={{ color: "#111184" }}>24 hours</strong>.
            </p>
            <a
              href="/programs"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "#111184",
                color: "#fff",
                padding: "14px 34px",
                fontSize: "0.8rem",
                fontWeight: 700,
                textDecoration: "none",
                letterSpacing: "0.07em",
                textTransform: "uppercase",
              }}
            >
              Explore More Programs <ArrowRight size={15} />
            </a>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{GLOBAL_CSS}</style>
      <div className="apply-wrap">
        {/* ══ HERO — 80vh real photo ══ */}
        <div className="hero">
          <img
            className="hero-img"
            src={assets.hero}
            alt="Students in a professional training session"
          />
          <div className="hero-scrim" />
          <div className="hero-content">
            <p className="hero-eyebrow">
              NITA Accredited · Online via Google Meet
            </p>
            <h1 className="hero-h1">
              Apply to
              <br />
              Lebanon TTC
            </h1>
            <div className="hero-progress">
              <div className="hero-track">
                <div className="hero-fill" style={{ width: `${pct}%` }} />
              </div>
              <span className="hero-step-label">
                Step {step + 1} of {STEPS.length}
              </span>
            </div>
          </div>
        </div>

        {/* ══ STEP BAR ══ */}
        <div className="step-bar">
          <div className="step-bar-inner">
            {STEPS.map((label, i) => {
              const done = i < step;
              const active = i === step;
              return (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flex: i < STEPS.length - 1 ? 1 : "none",
                  }}
                >
                  <div className="step-item">
                    <div
                      className="step-dot"
                      style={{
                        background: done || active ? "#111184" : "#eef2ff",
                      }}
                    >
                      {done ? (
                        <Check size={14} color="#FACC15" strokeWidth={2.5} />
                      ) : (
                        <span style={{ color: active ? "#FACC15" : "#8a96c4" }}>
                          {i + 1}
                        </span>
                      )}
                    </div>
                    <span
                      className="step-lbl"
                      style={{ color: active || done ? "#111184" : "#aab4d4" }}
                    >
                      {label}
                    </span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div
                      className="step-line"
                      style={{ background: done ? "#111184" : "#dde3f5" }}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ══ CONTENT ══ */}
        <div className={`content-wrap${step === 0 ? " step0" : ""}`}>
          {/* ── STEP 0: Choose School (full-bleed editorial masonry) ── */}
          {step === 0 && (
            <div
              key={`s0-${animKey}`}
              style={{ animation: "fadeUp 380ms ease-out" }}
            >
              <h2
                style={{
                  fontFamily: "'Tenor Sans',serif",
                  fontSize: "clamp(1.5rem, 4vw, 1.8rem)",
                  fontWeight: 400,
                  color: "#0f1a5c",
                  margin: "0 0 28px",
                  padding: "0 clamp(16px, 4vw, 48px)",
                }}
              >
                Choose your school
              </h2>

              <div className="school-grid-bleed">
                <div className="school-grid">
                  {categories.map((c, i) => {
                    const active = selectedCat === c.id;
                    return (
                      <button
                        key={c.id}
                        className={`school-card${active ? " active" : ""}`}
                        onClick={() => setSelectedCat(c.id)}
                        style={{
                          gridColumn: `span ${c.span.col}`,
                          gridRow: `span ${c.span.row}`,
                          animation: `fadeUp 380ms cubic-bezier(0.22,1,0.36,1) ${i * 55}ms both`,
                        }}
                      >
                        <img className="school-img" src={c.img} alt={c.label} />
                        <div className="school-name-bar">
                          <span className="school-name">{c.label}</span>
                          <div className="school-check" aria-hidden="true">
                            <Check size={14} color="#111184" strokeWidth={3} />
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Selection preview — appears immediately below the grid
                    and pulls the page down to it via the scroll effect above. */}
                {cat && (
                  <div ref={previewRef} className="school-select-preview">
                    <img src={cat.img} alt={cat.label} />
                    <div className="school-select-preview-body">
                      <p
                        style={{
                          fontSize: "0.58rem",
                          fontWeight: 700,
                          letterSpacing: "0.12em",
                          textTransform: "uppercase",
                          color: "rgba(250,204,21,0.7)",
                          margin: 0,
                        }}
                      >
                        You selected
                      </p>
                      <p
                        style={{
                          fontSize: "clamp(1.05rem, 3vw, 1.25rem)",
                          fontFamily: "'Tenor Sans',serif",
                          fontWeight: 400,
                          color: "#fff",
                          margin: 0,
                        }}
                      >
                        {cat.label}
                      </p>
                      <p
                        style={{
                          fontSize: "0.78rem",
                          color: "rgba(255,255,255,0.5)",
                          margin: "4px 0 4px",
                        }}
                      >
                        {cat.programs.length} programs available
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── STEP 1: Choose Program ── */}
          {step === 1 && cat && (
            <div
              key={`s1-${animKey}`}
              style={{ animation: "fadeUp 360ms ease-out" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  marginBottom: 28,
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    flexShrink: 0,
                    background: "#eef2ff",
                    border: "1.5px solid #c7d2fe",
                    overflow: "hidden",
                  }}
                >
                  <img
                    src={cat.img}
                    alt=""
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      opacity: 0.7,
                    }}
                  />
                </div>
                <div>
                  <p
                    style={{
                      fontSize: "0.65rem",
                      fontWeight: 700,
                      letterSpacing: "0.13em",
                      textTransform: "uppercase",
                      color: "#6366f1",
                      margin: "0 0 3px",
                    }}
                  >
                    Select a program
                  </p>
                  <h2
                    style={{
                      fontFamily: "'Tenor Sans',serif",
                      fontSize: "clamp(1.25rem, 4vw, 1.55rem)",
                      fontWeight: 400,
                      color: "#0f1a5c",
                      margin: 0,
                    }}
                  >
                    {cat.label}
                  </h2>
                </div>
              </div>

              <div className="prog-list">
                {cat.programs.map((prog, i) => {
                  const active = selectedProg === prog;
                  return (
                    <button
                      key={prog}
                      className={`prog-row${active ? " active" : ""}`}
                      onClick={() => setSelectedProg(prog)}
                      style={{
                        animation: `fadeUp 280ms ease-out ${i * 40}ms both`,
                      }}
                    >
                      <span className="pname">{prog}</span>
                      {active && (
                        <div className="prog-dot">
                          <Check size={12} color="#FACC15" strokeWidth={2.5} />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Course preview — appears on selection, large sharp-edged image */}
              {selectedProg && (
                <div ref={courseRef} className="course-preview">
                  <img src={cat.img} alt={selectedProg} />
                  <div className="course-preview-body">
                    <p
                      style={{
                        fontSize: "0.58rem",
                        fontWeight: 700,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        color: "rgba(250,204,21,0.7)",
                        margin: "0 0 6px",
                      }}
                    >
                      You selected
                    </p>
                    <p
                      style={{
                        fontSize: "1rem",
                        fontWeight: 700,
                        color: "#fff",
                        margin: "0 0 8px",
                        lineHeight: 1.3,
                      }}
                    >
                      {selectedProg}
                    </p>
                    <p
                      style={{
                        fontSize: "0.77rem",
                        color: "rgba(255,255,255,0.5)",
                        margin: "0 0 18px",
                        lineHeight: 1.65,
                      }}
                    >
                      Want to learn more before applying? Read the full
                      curriculum, duration, and outcomes.
                    </p>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 14,
                        flexWrap: "wrap",
                      }}
                    >
                      <a
                        href={`/programs/${cat.id}`}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 7,
                          background: "rgba(250,204,21,0.15)",
                          color: "#FACC15",
                          border: "1px solid rgba(250,204,21,0.35)",
                          padding: "10px 18px",
                          fontSize: "0.76rem",
                          fontWeight: 700,
                          textDecoration: "none",
                          letterSpacing: "0.04em",
                          transition: "background 200ms",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.background =
                            "rgba(250,204,21,0.25)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.background =
                            "rgba(250,204,21,0.15)")
                        }
                      >
                        <BookOpen size={14} /> Explore Program Details
                      </a>
                      <a
                        href={`/programs/${cat.id}#curriculum`}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 5,
                          color: "rgba(255,255,255,0.4)",
                          fontSize: "0.73rem",
                          fontWeight: 600,
                          textDecoration: "none",
                          transition: "color 200ms",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.color =
                            "rgba(255,255,255,0.75)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.color =
                            "rgba(255,255,255,0.4)")
                        }
                      >
                        View Curriculum <ExternalLink size={11} />
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── STEP 2: Details ── */}
          {step === 2 && (
            <div
              key={`s2-${animKey}`}
              style={{ animation: "fadeUp 360ms ease-out" }}
            >
              {prefill && (
                <div className="prefill-badge">
                  <Check size={13} strokeWidth={3} />
                  {cat?.label} selected from the catalogue
                </div>
              )}
              <div
                style={{
                  background: "linear-gradient(135deg,#eef2ff,#f5f3ff)",
                  border: "1.5px solid #c7d2fe",
                  padding: "18px 22px",
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  marginBottom: 30,
                }}
              >
                <div
                  style={{
                    fontSize: "2rem",
                    animation: "float 3s ease-in-out infinite",
                    flexShrink: 0,
                  }}
                >
                  🎓
                </div>
                <div>
                  <p
                    style={{
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      color: "#3730a3",
                      margin: "0 0 3px",
                    }}
                  >
                    Almost there — you're doing great.
                  </p>
                  <p
                    style={{ fontSize: "0.76rem", color: "#6366f1", margin: 0 }}
                  >
                    Applying for <strong>{selectedProg}</strong>
                  </p>
                </div>
              </div>

              <h2
                style={{
                  fontFamily: "'Tenor Sans',serif",
                  fontSize: "clamp(1.3rem, 4vw, 1.6rem)",
                  fontWeight: 400,
                  color: "#0f1a5c",
                  margin: "0 0 26px",
                }}
              >
                Tell us about yourself
              </h2>

              <div className="field-group">
                <div className="two-col-grid">
                  <Field label="First Name" required>
                    <input
                      name="firstName"
                      value={form.firstName}
                      onChange={onChange}
                      placeholder="e.g. Amina"
                      className="field-input"
                    />
                  </Field>
                  <Field label="Last Name" required>
                    <input
                      name="lastName"
                      value={form.lastName}
                      onChange={onChange}
                      placeholder="e.g. Wanjiku"
                      className="field-input"
                    />
                  </Field>
                </div>
                <Field label="Email Address" required>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={onChange}
                    placeholder="amina@example.com"
                    className="field-input"
                  />
                </Field>
                <Field label="Phone Number" required>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "86px 1fr",
                      gap: 10,
                    }}
                  >
                    <div
                      className="field-input"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 5,
                        fontSize: "0.82rem",
                        color: "#1e2a6e",
                        cursor: "default",
                        padding: "13px 10px",
                      }}
                    >
                      🇰🇪 +254
                    </div>
                    <input
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={onChange}
                      placeholder="7XX XXX XXX"
                      className="field-input"
                    />
                  </div>
                </Field>
                <div className="two-col-grid">
                  <Field label="National ID / Passport">
                    <input
                      name="idNumber"
                      value={form.idNumber}
                      onChange={onChange}
                      placeholder="e.g. 12345678"
                      className="field-input"
                    />
                  </Field>
                  <Field label="County">
                    <input
                      name="county"
                      value={form.county}
                      onChange={onChange}
                      placeholder="e.g. Nairobi"
                      className="field-input"
                    />
                  </Field>
                </div>
                <Field label="Employer / Organization" optional>
                  <input
                    name="employer"
                    value={form.employer}
                    onChange={onChange}
                    placeholder="e.g. Ministry of Health"
                    className="field-input"
                  />
                </Field>
                <Field label="How did you hear about us?">
                  <div style={{ position: "relative" }}>
                    <select
                      name="heard"
                      value={form.heard}
                      onChange={onChange}
                      className="field-input"
                      style={{
                        appearance: "none",
                        WebkitAppearance: "none",
                        paddingRight: 36,
                        cursor: "pointer",
                      }}
                    >
                      <option value="">Select an option</option>
                      <option>Social Media</option>
                      <option>Friend / Colleague</option>
                      <option>Google Search</option>
                      <option>WhatsApp</option>
                      <option>Flyer / Poster</option>
                      <option>Other</option>
                    </select>
                    <ChevronDown
                      size={16}
                      color="#8a96c4"
                      style={{
                        position: "absolute",
                        right: 14,
                        top: "50%",
                        transform: "translateY(-50%)",
                        pointerEvents: "none",
                      }}
                    />
                  </div>
                </Field>
                <Field label="Why do you want to join?" optional>
                  <textarea
                    name="motivation"
                    value={form.motivation}
                    onChange={onChange}
                    rows={4}
                    placeholder="Share your goals — what do you hope to achieve?"
                    className="field-input"
                    style={{ resize: "none", lineHeight: 1.7 }}
                  />
                </Field>
              </div>
            </div>
          )}

          {/* ── STEP 3: Review ── */}
          {step === 3 && (
            <div
              key={`s3-${animKey}`}
              style={{ animation: "fadeUp 360ms ease-out" }}
            >
              <h2
                style={{
                  fontFamily: "'Tenor Sans',serif",
                  fontSize: "clamp(1.3rem, 4vw, 1.6rem)",
                  fontWeight: 400,
                  color: "#0f1a5c",
                  margin: "0 0 6px",
                }}
              >
                Looks great, {form.firstName}!
              </h2>
              <p
                style={{
                  fontSize: "0.83rem",
                  color: "#6b7bba",
                  margin: "0 0 28px",
                }}
              >
                Double-check everything before you submit.
              </p>

              <div className="review-prog-card">
                <img src={cat?.img} alt={selectedProg} />
                <div className="review-prog-overlay" />
                <div className="review-prog-body">
                  <p
                    style={{
                      fontSize: "0.58rem",
                      fontWeight: 700,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: "rgba(250,204,21,0.7)",
                      margin: "0 0 6px",
                    }}
                  >
                    Selected Program
                  </p>
                  <p
                    style={{
                      fontSize: "1.05rem",
                      fontWeight: 700,
                      color: "#fff",
                      margin: "0 0 3px",
                    }}
                  >
                    {selectedProg}
                  </p>
                  <p
                    style={{
                      fontSize: "0.78rem",
                      color: "rgba(255,255,255,0.5)",
                      margin: "0 0 14px",
                    }}
                  >
                    {cat?.label}
                  </p>
                  <a
                    href={`/programs/${cat?.id}`}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 5,
                      color: "rgba(250,204,21,0.75)",
                      fontSize: "0.72rem",
                      fontWeight: 600,
                      textDecoration: "none",
                    }}
                  >
                    <BookOpen size={12} /> View full program details{" "}
                    <ExternalLink size={11} />
                  </a>
                </div>
              </div>

              <div
                style={{
                  background: "white",
                  border: "1.5px solid #dde3f5",
                  padding: "24px 28px",
                }}
                className="review-grid"
              >
                {[
                  ["Full Name", `${form.firstName} ${form.lastName}`],
                  ["Email", form.email],
                  ["Phone", `+254 ${form.phone}`],
                  ["ID / Passport", form.idNumber || "—"],
                  ["County", form.county || "—"],
                  ["Employer", form.employer || "—"],
                  ["How they heard", form.heard || "—"],
                ].map(([lbl, val]) => (
                  <div key={lbl}>
                    <p
                      style={{
                        fontSize: "0.6rem",
                        fontWeight: 700,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "#aab4d4",
                        margin: "0 0 4px",
                      }}
                    >
                      {lbl}
                    </p>
                    <p
                      style={{
                        fontSize: "0.87rem",
                        color: "#1e2a6e",
                        fontWeight: 500,
                        margin: 0,
                        wordBreak: "break-word",
                      }}
                    >
                      {val}
                    </p>
                  </div>
                ))}
                {form.motivation && (
                  <div style={{ gridColumn: "1/-1" }}>
                    <p
                      style={{
                        fontSize: "0.6rem",
                        fontWeight: 700,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "#aab4d4",
                        margin: "0 0 5px",
                      }}
                    >
                      Motivation
                    </p>
                    <p
                      style={{
                        fontSize: "0.87rem",
                        color: "#1e2a6e",
                        margin: 0,
                        lineHeight: 1.7,
                      }}
                    >
                      {form.motivation}
                    </p>
                  </div>
                )}
              </div>
              {submitError && (
                <p
                  style={{
                    fontSize: "0.78rem",
                    color: "#dc2626",
                    margin: "16px 0 0",
                    textAlign: "center",
                    fontWeight: 600,
                  }}
                >
                  {submitError}
                </p>
              )}
              <p
                style={{
                  fontSize: "0.72rem",
                  color: "#aab4d4",
                  margin: "16px 0 0",
                  textAlign: "center",
                }}
              >
                By submitting, you agree to be contacted by the Lebanon TTC
                admissions team.
              </p>
            </div>
          )}

          {/* ── NAV ── */}
          <div className="nav-row">
            {step > 0 ? (
              <button
                className="btn-back"
                onClick={goBack}
                disabled={submitting}
              >
                <ArrowLeft size={15} /> Back
              </button>
            ) : (
              <div />
            )}
            {step < 3 ? (
              <button
                className={`btn-next ${canNext() ? "on" : "off"}`}
                onClick={goNext}
                disabled={!canNext()}
              >
                Continue <ArrowRight size={15} />
              </button>
            ) : (
              <button
                className={`btn-next ${submitting ? "loading" : "on"}`}
                onClick={handleSubmit}
                disabled={submitting}
              >
                {submitting ? "Submitting..." : "Submit Application"}{" "}
                <ArrowRight size={15} />
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
