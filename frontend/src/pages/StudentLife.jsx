import { useState } from "react";
import { ArrowRight, Video, Users2 } from "lucide-react";
import { assets } from "../assets/assets";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Tenor+Sans&family=Inter:wght@400;500;600;700&display=swap');

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(30px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .sl-page {
    font-family: 'Inter', sans-serif;
    background: #fff;
    color: #1e2a6e;
  }

  /* ── HERO ── */
  .sl-hero {
    position: relative;
    height: 68vh; min-height: 480px;
    overflow: hidden;
    background: #0b1060;
  }
  .sl-hero img {
    position: absolute; inset: 0;
    width: 100%; height: 100%;
    object-fit: cover; object-position: center 30%;
    opacity: 0.55;
  }
  .sl-hero-scrim {
    position: absolute; inset: 0;
    background: linear-gradient(to bottom, rgba(8,10,72,0.2) 0%, rgba(8,10,72,0.75) 100%);
  }
  .sl-hero-content {
    position: absolute; inset: 0;
    display: flex; flex-direction: column;
    justify-content: flex-end;
    padding: 0 72px 64px;
    max-width: 860px;
  }
  .sl-hero-eye {
    font-size: 0.64rem; font-weight: 700;
    letter-spacing: 0.18em; text-transform: uppercase;
    color: rgba(250,204,21,0.85); margin-bottom: 14px;
  }
  .sl-hero h1 {
    font-family: 'Tenor Sans', serif;
    font-size: clamp(2.4rem, 5vw, 3.8rem);
    font-weight: 400; color: #fff;
    line-height: 1.1; margin-bottom: 16px;
  }
  .sl-hero p {
    font-size: 1rem; color: rgba(255,255,255,0.6);
    line-height: 1.75; max-width: 520px;
  }

  /* ── NAV TABS ── */
  .sl-tabs {
    background: white;
    border-bottom: 1px solid #e2e8f5;
    position: sticky; top: 0; z-index: 40;
  }
  .sl-tabs-inner {
    max-width: 1100px; margin: 0 auto;
    padding: 0 48px;
    display: flex; gap: 0; overflow-x: auto;
  }
  .sl-tab {
    padding: 18px 26px;
    font-size: 0.78rem; font-weight: 700;
    letter-spacing: 0.06em; text-transform: uppercase;
    color: #8a96c4; background: none; border: none;
    cursor: pointer; white-space: nowrap;
    border-bottom: 3px solid transparent;
    transition: color 200ms, border-color 200ms;
    font-family: 'Inter', sans-serif;
  }
  .sl-tab:hover { color: #111184; }
  .sl-tab.active { color: #111184; border-bottom-color: #FACC15; }

  /* ── HYBRID BAND (Google Meet + physical on request) ── */
  .sl-hybrid {
    max-width: 1100px; margin: 0 auto;
    padding: 72px 48px;
  }
  .sl-hybrid-eye {
    font-size: 0.62rem; font-weight: 700;
    letter-spacing: 0.16em; text-transform: uppercase;
    color: #6366f1; margin-bottom: 14px; text-align: center;
  }
  .sl-hybrid h2 {
    font-family: 'Tenor Sans', serif;
    font-size: clamp(1.8rem, 3.4vw, 2.6rem);
    font-weight: 400; color: #0f1a5c;
    line-height: 1.15; text-align: center;
    margin: 0 auto 48px; max-width: 620px;
  }
  .sl-hybrid-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
  }
  .sl-hybrid-card {
    border-radius: 0;
    border: 1px solid #dde3f5;
    padding: 32px 30px;
    background: #f8f9ff;
  }
  .sl-hybrid-card.on { background: #111184; border-color: #111184; }
  .sl-hybrid-icon {
    width: 44px; height: 44px; border-radius: 0;
    background: #FACC15;
    display: flex; align-items: center; justify-content: center;
    margin-bottom: 20px;
  }
  .sl-hybrid-card.on .sl-hybrid-icon { background: rgba(250,204,21,0.9); }
  .sl-hybrid-tag {
    font-size: 0.62rem; font-weight: 700;
    letter-spacing: 0.14em; text-transform: uppercase;
    color: #6366f1; margin-bottom: 10px;
  }
  .sl-hybrid-card.on .sl-hybrid-tag { color: rgba(250,204,21,0.85); }
  .sl-hybrid-card h3 {
    font-family: 'Tenor Sans', serif;
    font-size: 1.3rem; font-weight: 400;
    color: #0f1a5c; margin-bottom: 12px;
  }
  .sl-hybrid-card.on h3 { color: #fff; }
  .sl-hybrid-card p {
    font-size: 0.86rem; line-height: 1.75;
    color: #4b5a8a;
  }
  .sl-hybrid-card.on p { color: rgba(255,255,255,0.65); }

  /* ── SPLIT SECTION ── */
  .sl-split {
    display: grid;
    grid-template-columns: 1fr 1fr;
    min-height: 520px;
  }
  .sl-split.flip { direction: rtl; }
  .sl-split.flip > * { direction: ltr; }

  .sl-split-img {
    position: relative; overflow: hidden;
    background: #0b1060;
  }
  .sl-split-img img {
    width: 100%; height: 100%;
    object-fit: cover; display: block;
    transition: transform 700ms cubic-bezier(0.25,0.46,0.45,0.94);
  }
  .sl-split:hover .sl-split-img img {
    transform: scale(1.04);
  }
  .sl-split-img-cap {
    position: absolute; bottom: 16px; left: 16px;
    background: rgba(8,10,72,0.75);
    color: rgba(255,255,255,0.85);
    font-size: 0.66rem; font-weight: 600;
    letter-spacing: 0.04em;
    padding: 7px 14px; border-radius: 0;
  }

  .sl-split-body {
    display: flex; flex-direction: column;
    justify-content: center;
    padding: 72px 64px;
  }
  .sl-split-body.gold { background: #FACC15; }
  .sl-split-body.navy { background: #0b1060; }
  .sl-split-body.slate { background: #eef2ff; }

  .sl-split-eye {
    font-size: 0.62rem; font-weight: 700;
    letter-spacing: 0.16em; text-transform: uppercase;
    margin-bottom: 16px;
  }
  .sl-split-h2 {
    font-family: 'Tenor Sans', serif;
    font-size: clamp(1.8rem, 3vw, 2.6rem);
    font-weight: 400; line-height: 1.12;
    margin-bottom: 18px;
  }
  .sl-split-p {
    font-size: 0.93rem; line-height: 1.82;
    margin-bottom: 28px;
  }
  .sl-split-link {
    display: inline-flex; align-items: center; gap: 8px;
    font-size: 0.82rem; font-weight: 700;
    letter-spacing: 0.05em; text-decoration: none;
    padding-bottom: 3px;
    border-bottom: 2px solid currentColor;
    width: fit-content;
    transition: gap 200ms, opacity 200ms;
  }
  .sl-split-link:hover { gap: 13px; opacity: 0.75; }

  .sl-split-body.gold .sl-split-eye  { color: #0b1060; }
  .sl-split-body.gold .sl-split-h2   { color: #0b1060; }
  .sl-split-body.gold .sl-split-p    { color: rgba(11,16,96,0.72); }
  .sl-split-body.gold .sl-split-link { color: #0b1060; }

  .sl-split-body.navy .sl-split-eye  { color: rgba(250,204,21,0.75); }
  .sl-split-body.navy .sl-split-h2   { color: #fff; }
  .sl-split-body.navy .sl-split-p    { color: rgba(255,255,255,0.6); }
  .sl-split-body.navy .sl-split-link { color: #FACC15; }

  .sl-split-body.slate .sl-split-eye  { color: #6366f1; }
  .sl-split-body.slate .sl-split-h2   { color: #0f1a5c; }
  .sl-split-body.slate .sl-split-p    { color: #4b5a8a; }
  .sl-split-body.slate .sl-split-link { color: #111184; }

  /* ── PEER LEARNING CIRCLES STRIP ── */
  .sl-clubs {
    background: #0b1060;
    padding: 80px 48px;
  }
  .sl-clubs-inner { max-width: 1100px; margin: 0 auto; }
  .sl-clubs-eye {
    font-size: 0.62rem; font-weight: 700;
    letter-spacing: 0.16em; text-transform: uppercase;
    color: rgba(250,204,21,0.75); margin-bottom: 14px;
  }
  .sl-clubs h2 {
    font-family: 'Tenor Sans', serif;
    font-size: clamp(1.8rem, 3vw, 2.5rem);
    font-weight: 400; color: #fff;
    margin-bottom: 12px; line-height: 1.12;
  }
  .sl-clubs-sub {
    font-size: 0.88rem; color: rgba(255,255,255,0.55);
    max-width: 560px; line-height: 1.7; margin-bottom: 48px;
  }
  .sl-clubs-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }
  .club-card {
    border-radius: 0; overflow: hidden;
    position: relative; aspect-ratio: 3/4;
    cursor: default;
    transition: transform 300ms cubic-bezier(0.34,1.56,0.64,1);
  }
  .club-card:hover { transform: translateY(-8px); }
  .club-card img {
    width: 100%; height: 100%;
    object-fit: cover; display: block;
    transition: transform 600ms ease, filter 400ms;
    filter: brightness(0.75) saturate(0.85);
  }
  .club-card:hover img {
    transform: scale(1.06);
    filter: brightness(0.85) saturate(1.05);
  }
  .club-card-body {
    position: absolute; inset: 0;
    background: linear-gradient(to top, rgba(8,10,72,0.92) 0%, rgba(8,10,72,0.1) 55%, transparent 100%);
    display: flex; flex-direction: column;
    justify-content: flex-end;
    padding: 28px 24px;
  }
  .club-tag {
    font-size: 0.58rem; font-weight: 700;
    letter-spacing: 0.14em; text-transform: uppercase;
    color: #FACC15; margin-bottom: 8px;
  }
  .club-name {
    font-family: 'Tenor Sans', serif;
    font-size: 1.3rem; font-weight: 400;
    color: #fff; line-height: 1.2; margin-bottom: 10px;
  }
  .club-desc {
    font-size: 0.76rem; color: rgba(255,255,255,0.55);
    line-height: 1.6;
  }

  /* ── CTA BAND ── */
  .sl-cta {
    background: #FACC15;
    padding: 80px 48px;
    text-align: center;
  }
  .sl-cta h2 {
    font-family: 'Tenor Sans', serif;
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 400; color: #0b1060;
    margin-bottom: 14px; line-height: 1.15;
  }
  .sl-cta p {
    font-size: 0.95rem; color: rgba(11,16,96,0.65);
    margin-bottom: 32px; line-height: 1.7;
  }
  .sl-cta a {
    display: inline-flex; align-items: center; gap: 9px;
    background: #0b1060; color: #fff;
    padding: 15px 36px; border-radius: 0;
    font-size: 0.82rem; font-weight: 700;
    text-decoration: none; letter-spacing: 0.07em; text-transform: uppercase;
    transition: background 200ms, transform 200ms, box-shadow 200ms;
  }
  .sl-cta a:hover {
    background: #070c4a; transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(11,16,96,0.3);
  }

  @media (max-width: 768px) {
    .sl-split { grid-template-columns: 1fr; }
    .sl-split.flip { direction: ltr; }
    .sl-split-img { min-height: 320px; }
    .sl-split-body { padding: 48px 32px; }
    .sl-hero-content { padding: 0 32px 48px; }
    .sl-clubs-grid { grid-template-columns: 1fr; }
    .sl-tabs-inner { padding: 0 16px; }
    .sl-hybrid { padding: 56px 20px; }
    .sl-hybrid-grid { grid-template-columns: 1fr; }
  }
`;

const sections = [
  { id: "hybrid", label: "How Classes Work" },
  { id: "community", label: "Community" },
  { id: "careers", label: "Career Growth" },
  { id: "circles", label: "Peer Learning Circles" },
];

export default function StudentLife() {
  const [activeTab, setActiveTab] = useState("hybrid");

  const scrollTo = (id) => {
    setActiveTab(id);
    document
      .getElementById(`sl-${id}`)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <style>{CSS}</style>
      <div className="sl-page">
        {/* ── HERO ── */}
        <div className="sl-hero">
          <img src={assets.sl1} alt="Students in a live facilitated session" />
          <div className="sl-hero-scrim" />
          <div className="sl-hero-content">
            <p className="sl-hero-eye">Student Life at Lebanon TTC</p>
            <h1>
              Life beyond
              <br />
              the classroom
            </h1>
            <p>
              Your time here isn't just about certificates. Learn live on Google
              Meet from anywhere, or step into a physical room when you want to
              — it's the connections and growth that stay with you.
            </p>
          </div>
        </div>

        {/* ── TABS ── */}
        <div className="sl-tabs">
          <div className="sl-tabs-inner">
            {sections.map((s) => (
              <button
                key={s.id}
                className={`sl-tab${activeTab === s.id ? " active" : ""}`}
                onClick={() => scrollTo(s.id)}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* ══════════════════════════════════════════
            HOW CLASSES WORK — online-first, physical on request
        ══════════════════════════════════════════ */}
        <div id="sl-hybrid" className="sl-hybrid">
          <p className="sl-hybrid-eye">How Classes Work</p>
          <h2>Learn wherever you are — meet in person whenever you want to</h2>
          <div className="sl-hybrid-grid">
            <div className="sl-hybrid-card on">
              <div className="sl-hybrid-icon">
                <Video size={20} color="#0b1060" />
              </div>
              <p className="sl-hybrid-tag">Default</p>
              <h3>Live on Google Meet</h3>
              <p>
                Every class runs live over Google Meet with your facilitator and
                classmates, so you can join from anywhere in Kenya — without
                disrupting your work or daily schedule.
              </p>
            </div>
            <div className="sl-hybrid-card">
              <div className="sl-hybrid-icon">
                <Users2 size={20} color="#0b1060" />
              </div>
              <p className="sl-hybrid-tag">On Request</p>
              <h3>Physical sessions, when you need them</h3>
              <p>
                Prefer to meet in person? Request a physical session at our
                Kiritiri Town premises for mentorship, group work, or
                presentation practice with your facilitator.
              </p>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════
            COMMUNITY — real facilitator + student session
        ══════════════════════════════════════════ */}
        <div id="sl-community" className="sl-split flip">
          <div className="sl-split-body navy">
            <p className="sl-split-eye">Community & Mentorship</p>
            <h2 className="sl-split-h2">
              Small groups,
              <br />
              real feedback
            </h2>
            <p className="sl-split-p">
              Whether you're online or in the room, classes stay small enough
              that your facilitator knows your name — and your work. Every
              cohort gets direct mentorship, peer discussion, and guidance
              tailored to where you're headed next.
            </p>
            <a href="/student-life/community" className="sl-split-link">
              Meet the Community <ArrowRight size={15} />
            </a>
          </div>
          <div className="sl-split-img">
            <img
              src={assets.sl2}
              alt="Facilitator mentoring students around a table"
            />
            <span className="sl-split-img-cap">
              A live mentorship session at LTTC
            </span>
          </div>
        </div>

        {/* ══════════════════════════════════════════
            CAREER GROWTH — real presentation photo
        ══════════════════════════════════════════ */}
        <div id="sl-careers" className="sl-split">
          <div className="sl-split-body slate">
            <p className="sl-split-eye">Career & Professional Growth</p>
            <h2 className="sl-split-h2">
              Built for
              <br />
              what's next
            </h2>
            <p className="sl-split-p">
              You'll practice the skills employers actually ask for — presenting
              under pressure, structuring an argument, thinking like a manager —
              in live sessions on topics like Public Policy, PR & Communication,
              and Project Management.
            </p>
            <a href="/student-life/careers" className="sl-split-link">
              Career Resources <ArrowRight size={15} />
            </a>
          </div>
          <div className="sl-split-img">
            <img
              src={assets.sl3}
              alt="Student presenting to peers at a whiteboard"
            />
            <span className="sl-split-img-cap">
              Student-led session: Public Policy & Administration
            </span>
          </div>
        </div>

        {/* ══════════════════════════════════════════
            PEER LEARNING CIRCLES — real topics, real students
        ══════════════════════════════════════════ */}
        <div id="sl-circles" className="sl-clubs">
          <div className="sl-clubs-inner">
            <p className="sl-clubs-eye">Peer Learning Circles</p>
            <h2>Learn it, then teach it back.</h2>
            <p className="sl-clubs-sub">
              Every cohort runs peer-led sessions where students take a topic
              from the whiteboard to the front of the room — building the exact
              skills you'll need on the job.
            </p>
            <div className="sl-clubs-grid">
              <div className="club-card">
                <img
                  src={assets.sl4}
                  alt="Student presenting on PR and Communication"
                />
                <div className="club-card-body">
                  <p className="club-tag">Communication</p>
                  <p className="club-name">PR &amp; Communication Circle</p>
                  <p className="club-desc">
                    Brand reputation, crisis handling, and AI media tools —
                    presented by students, for students.
                  </p>
                </div>
              </div>

              <div className="club-card">
                <img
                  src={assets.sl5}
                  alt="Student presenting on Public Policy and Administration"
                />
                <div className="club-card-body">
                  <p className="club-tag">Governance</p>
                  <p className="club-name">Public Policy Circle</p>
                  <p className="club-desc">
                    Planning, organizing, directing, and budgeting — the
                    fundamentals of public administration, worked through
                    together.
                  </p>
                </div>
              </div>

              <div className="club-card">
                <img
                  src={assets.sl6}
                  alt="Students working through a project management session"
                />
                <div className="club-card-body">
                  <p className="club-tag">Management</p>
                  <p className="club-name">Project Management Circle</p>
                  <p className="club-desc">
                    Scope, budget, timeline, and stakeholders — walked through
                    on the whiteboard, then applied to a real case.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── CTA ── */}
        <div className="sl-cta">
          <h2>Ready to be part of it?</h2>
          <p>
            Apply today — join live on Google Meet, or request a physical
            session with us in Kiritiri Town.
          </p>
          <a href="/apply">
            Apply Now <ArrowRight size={15} />
          </a>
        </div>
      </div>
    </>
  );
}
