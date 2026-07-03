import { useState } from "react";
import { ArrowRight, ExternalLink } from "lucide-react";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Tenor+Sans&family=Inter:wght@400;500;600;700&display=swap');

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(30px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes slideIn {
    from { opacity: 0; transform: translateX(-24px); }
    to   { opacity: 1; transform: translateX(0); }
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
    object-fit: cover; object-position: center 35%;
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

  .sl-split-body {
    display: flex; flex-direction: column;
    justify-content: center;
    padding: 72px 64px;
  }
  .sl-split-body.gold { background: #FACC15; }
  .sl-split-body.navy { background: #0b1060; }
  .sl-split-body.cream { background: #f8f6f0; }
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

  /* color tokens per panel */
  .sl-split-body.gold .sl-split-eye  { color: #0b1060; }
  .sl-split-body.gold .sl-split-h2   { color: #0b1060; }
  .sl-split-body.gold .sl-split-p    { color: rgba(11,16,96,0.72); }
  .sl-split-body.gold .sl-split-link { color: #0b1060; }

  .sl-split-body.navy .sl-split-eye  { color: rgba(250,204,21,0.75); }
  .sl-split-body.navy .sl-split-h2   { color: #fff; }
  .sl-split-body.navy .sl-split-p    { color: rgba(255,255,255,0.6); }
  .sl-split-body.navy .sl-split-link { color: #FACC15; }

  .sl-split-body.cream .sl-split-eye  { color: #6366f1; }
  .sl-split-body.cream .sl-split-h2   { color: #0f1a5c; }
  .sl-split-body.cream .sl-split-p    { color: #4b5a8a; }
  .sl-split-body.cream .sl-split-link { color: #111184; }

  .sl-split-body.slate .sl-split-eye  { color: #6366f1; }
  .sl-split-body.slate .sl-split-h2   { color: #0f1a5c; }
  .sl-split-body.slate .sl-split-p    { color: #4b5a8a; }
  .sl-split-body.slate .sl-split-link { color: #111184; }

  /* ── CLUBS STRIP ── */
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
    margin-bottom: 48px; line-height: 1.12;
  }
  .sl-clubs-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }
  .club-card {
    border-radius: 20px; overflow: hidden;
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
    padding: 15px 36px; border-radius: 12px;
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
  }
`;

const sections = [
  { id: "health", label: "Health & Wellness" },
  { id: "community", label: "Community" },
  { id: "faith", label: "Faith & Wellbeing" },
  { id: "careers", label: "Career Growth" },
  { id: "clubs", label: "Clubs" },
];

export default function StudentLife() {
  const [activeTab, setActiveTab] = useState("health");

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
          <img
            src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1600&q=80"
            alt="Students laughing together on campus"
          />
          <div className="sl-hero-scrim" />
          <div className="sl-hero-content">
            <p className="sl-hero-eye">Student Life at Lebanon TTC</p>
            <h1>
              Life beyond
              <br />
              the classroom
            </h1>
            <p>
              Your time here isn't just about certificates. It's about who you
              become — the connections, the growth, and the moments that stay
              with you long after graduation.
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
            HEALTH & WELLNESS — gold left, photo right
        ══════════════════════════════════════════ */}
        <div id="sl-health" className="sl-split">
          <div className="sl-split-body gold">
            <p className="sl-split-eye">Health & Wellness</p>
            <h2 className="sl-split-h2">
              Mind, body,
              <br />
              and soul
            </h2>
            <p className="sl-split-p">
              Your wellbeing is the foundation of everything you do. Lebanon TTC
              provides access to mental health support, fitness guidance, and
              wellness workshops designed to help you thrive — not just survive
              — through your studies and beyond.
            </p>
            <a href="/student-life/health" className="sl-split-link">
              More Information <ArrowRight size={15} />
            </a>
          </div>
          <div className="sl-split-img">
            <img
              src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=900&q=80"
              alt="Students in a wellness session"
            />
          </div>
        </div>

        {/* ══════════════════════════════════════════
            COMMUNITY — photo left, navy right
        ══════════════════════════════════════════ */}
        <div id="sl-community" className="sl-split flip">
          <div className="sl-split-body navy">
            <p className="sl-split-eye">Community & Belonging</p>
            <h2 className="sl-split-h2">
              A campus where
              <br />
              everyone fits
            </h2>
            <p className="sl-split-p">
              From orientation week to graduation, our community events, peer
              networks, and mentorship circles make sure no one walks this path
              alone. Diverse backgrounds, one shared direction — forward.
            </p>
            <a href="/student-life/community" className="sl-split-link">
              Meet the Community <ArrowRight size={15} />
            </a>
          </div>
          <div className="sl-split-img">
            <img
              src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=900&q=80"
              alt="Students gathered in community discussion"
            />
          </div>
        </div>

        {/* ══════════════════════════════════════════
            FAITH & WELLBEING — cream left, photo right
        ══════════════════════════════════════════ */}
        <div id="sl-faith" className="sl-split">
          <div className="sl-split-body cream">
            <p className="sl-split-eye">Faith & Spiritual Wellbeing</p>
            <h2 className="sl-split-h2">
              Grounded in
              <br />
              purpose
            </h2>
            <p className="sl-split-p">
              We honour the whole person. Spiritual reflection spaces,
              multi-faith dialogue forums, and chaplaincy support are available
              to all students regardless of background or belief — because inner
              clarity shapes outer excellence.
            </p>
            <a href="/student-life/faith" className="sl-split-link">
              Explore Spiritual Support <ArrowRight size={15} />
            </a>
          </div>
          <div className="sl-split-img">
            <img
              src="https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=900&q=80"
              alt="Students in quiet reflection"
            />
          </div>
        </div>

        {/* ══════════════════════════════════════════
            CAREER GROWTH — photo left, slate right
        ══════════════════════════════════════════ */}
        <div id="sl-careers" className="sl-split flip">
          <div className="sl-split-body slate">
            <p className="sl-split-eye">Career & Professional Growth</p>
            <h2 className="sl-split-h2">
              Built for
              <br />
              what's next
            </h2>
            <p className="sl-split-p">
              CV workshops, mock interviews, LinkedIn clinics, and direct
              connections to partner organisations. Our careers support doesn't
              start at graduation — it starts day one, so you're ready long
              before the moment comes.
            </p>
            <a href="/student-life/careers" className="sl-split-link">
              Career Resources <ArrowRight size={15} />
            </a>
          </div>
          <div className="sl-split-img">
            <img
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=900&q=80"
              alt="Students in a career workshop"
            />
          </div>
        </div>

        {/* ══════════════════════════════════════════
            CLUBS — dark strip with 3 cards
        ══════════════════════════════════════════ */}
        <div id="sl-clubs" className="sl-clubs">
          <div className="sl-clubs-inner">
            <p className="sl-clubs-eye">Student Clubs</p>
            <h2>
              Find your people.
              <br />
              Find your edge.
            </h2>
            <div className="sl-clubs-grid">
              {/* Club 1 — Toastmasters / Public Speaking */}
              <div className="club-card">
                <img
                  src="https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=700&q=75"
                  alt="Public speaking club"
                />
                <div className="club-card-body">
                  <p className="club-tag">Communication</p>
                  <p className="club-name">Speakers &amp; Leaders Club</p>
                  <p className="club-desc">
                    Weekly debates, pitch nights, and storytelling sessions.
                    Build the confidence to own any room.
                  </p>
                </div>
              </div>

              {/* Club 2 — Entrepreneurship */}
              <div className="club-card">
                <img
                  src="https://images.unsplash.com/photo-1556761175-4b46a572b786?w=700&q=75"
                  alt="Entrepreneurship club"
                />
                <div className="club-card-body">
                  <p className="club-tag">Innovation</p>
                  <p className="club-name">Founders &amp; Builders Club</p>
                  <p className="club-desc">
                    Business idea competitions, startup mentorship, and
                    pitch-deck workshops for aspiring entrepreneurs.
                  </p>
                </div>
              </div>

              {/* Club 3 — Data & Tech */}
              <div className="club-card">
                <img
                  src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=700&q=75"
                  alt="Tech and data club"
                />
                <div className="club-card-body">
                  <p className="club-tag">Technology</p>
                  <p className="club-name">Data &amp; Tech Society</p>
                  <p className="club-desc">
                    Hackathons, data challenges, and peer learning sessions for
                    students passionate about the digital frontier.
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
            Apply today and step into a community that invests in every
            dimension of your growth.
          </p>
          <a href="/apply">
            Apply Now <ArrowRight size={15} />
          </a>
        </div>
      </div>
    </>
  );
}
