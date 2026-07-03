import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { news, categories } from "../data/newsData";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600&family=Inter:wght@400;500;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .news-page {
    min-height: 100vh;
    background: #f9f8f5;
    font-family: 'Inter', sans-serif;
    color: #1a1a2e;
  }

  /* ── HEADER ── */
  .news-header {
    background: white;
    border-bottom: 1px solid #e5e7eb;
    padding: 52px 64px 0;
  }
  .news-header h1 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2.4rem, 4vw, 3.4rem);
    font-weight: 400;
    color: #0b1060;
    margin-bottom: 32px;
    letter-spacing: -0.01em;
  }

  /* ── CATEGORY TABS — full width, no scroll ── */
  .news-cats {
    display: flex;
    flex-wrap: wrap;
    gap: 0;
    border-top: 1px solid #e5e7eb;
  }
  .news-cat-btn {
    padding: 14px 20px;
    font-size: 0.76rem;
    font-weight: 600;
    letter-spacing: 0.03em;
    color: #6b7280;
    background: none;
    border: none;
    border-bottom: 3px solid transparent;
    cursor: pointer;
    white-space: nowrap;
    font-family: 'Inter', sans-serif;
    transition: color 180ms, border-color 180ms;
  }
  .news-cat-btn:hover { color: #0b1060; }
  .news-cat-btn.active {
    color: #0b1060;
    border-bottom-color: #FACC15;
    font-weight: 700;
  }

  /* ── BODY ── */
  .news-body {
    padding: 52px 64px 96px;
  }

  /* ── FEATURED — full width split ── */
  .featured-wrap {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2px;
    background: #d1d5db;
    margin-bottom: 64px;
    border-radius: 6px;
    overflow: hidden;
  }

  /* LEFT — big hero card */
  .feat-hero {
    position: relative;
    overflow: hidden;
    cursor: pointer;
    min-height: 540px;
    background: #0b1060;
  }
  .feat-hero img {
    position: absolute; inset: 0;
    width: 100%; height: 100%;
    object-fit: cover;
    transition: transform 700ms ease;
    opacity: 0.75;
  }
  .feat-hero:hover img { transform: scale(1.04); }
  .feat-hero-scrim {
    position: absolute; inset: 0;
    background: linear-gradient(to top, rgba(8,10,72,0.92) 0%, rgba(8,10,72,0.1) 55%, transparent 100%);
  }
  .feat-hero-body {
    position: absolute;
    bottom: 0; left: 0; right: 0;
    padding: 36px 40px;
  }

  /* RIGHT — stacked 3 cards */
  .feat-stack {
    display: grid;
    grid-template-rows: repeat(3, 1fr);
    gap: 2px;
    background: #d1d5db;
  }
  .feat-stack-card {
    display: grid;
    grid-template-columns: 180px 1fr;
    background: white;
    cursor: pointer;
    overflow: hidden;
    transition: background 150ms;
  }
  .feat-stack-card:hover { background: #f9f8f5; }
  .feat-stack-img-wrap { overflow: hidden; }
  .feat-stack-img {
    width: 180px; height: 100%;
    object-fit: cover; display: block;
    transition: transform 500ms ease;
  }
  .feat-stack-card:hover .feat-stack-img { transform: scale(1.07); }
  .feat-stack-body {
    padding: 24px 28px;
    display: flex; flex-direction: column; justify-content: center;
  }

  /* ── SECONDARY GRID — full width 4 cols ── */
  .section-label {
    font-size: 0.65rem;
    font-weight: 700;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: #9ca3af;
    margin-bottom: 24px;
    padding-bottom: 12px;
    border-bottom: 1px solid #e5e7eb;
  }
  .news-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 28px 24px;
  }
  .news-card {
    background: white;
    border: 1px solid #e5e7eb;
    border-radius: 4px;
    overflow: hidden;
    cursor: pointer;
    transition: box-shadow 220ms, transform 220ms;
  }
  .news-card:hover {
    box-shadow: 0 10px 36px rgba(11,16,96,0.11);
    transform: translateY(-4px);
  }
  .news-card-img-wrap { overflow: hidden; }
  .news-card img {
    width: 100%; height: 190px;
    object-fit: cover; display: block;
    transition: transform 500ms ease;
  }
  .news-card:hover img { transform: scale(1.05); }
  .news-card-body { padding: 18px 20px 22px; }

  /* ── SHARED ATOMS ── */
  .cat-tag {
    display: inline-block;
    font-size: 0.6rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #0b1060;
    background: #eef2ff;
    padding: 3px 9px;
    border-radius: 3px;
    margin-bottom: 10px;
  }
  .cat-tag-light {
    display: inline-block;
    font-size: 0.6rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #FACC15;
    background: rgba(250,204,21,0.15);
    padding: 3px 9px;
    border-radius: 3px;
    margin-bottom: 12px;
  }
  .title-xl {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.5rem, 2.2vw, 1.9rem);
    font-weight: 400; color: #fff;
    line-height: 1.25; margin-bottom: 12px;
  }
  .title-md {
    font-family: 'Playfair Display', serif;
    font-size: 1rem;
    font-weight: 500; color: #0b1060;
    line-height: 1.35; margin-bottom: 6px;
  }
  .title-sm {
    font-family: 'Playfair Display', serif;
    font-size: 0.95rem;
    font-weight: 400; color: #0b1060;
    line-height: 1.3; margin-bottom: 8px;
  }
  .excerpt {
    font-size: 0.82rem; color: #6b7280;
    line-height: 1.7; margin-bottom: 16px;
  }
  .meta { font-size: 0.68rem; color: #9ca3af; font-weight: 500; }
  .meta-white { font-size: 0.72rem; color: rgba(255,255,255,0.55); font-weight: 500; }

  .read-link {
    display: inline-flex; align-items: center; gap: 5px;
    font-size: 0.76rem; font-weight: 700; color: #FACC15;
    background: none; border: none; cursor: pointer;
    font-family: 'Inter', sans-serif; letter-spacing: 0.03em;
    margin-top: 14px;
    transition: gap 180ms;
  }
  .read-link:hover { gap: 9px; }

  @media (max-width: 1100px) {
    .news-grid { grid-template-columns: repeat(3, 1fr); }
  }
  @media (max-width: 860px) {
    .news-header { padding: 40px 28px 0; }
    .news-body { padding: 36px 28px 72px; }
    .featured-wrap { grid-template-columns: 1fr; }
    .feat-hero { min-height: 400px; }
    .feat-stack { grid-template-rows: auto; }
    .feat-stack-card { grid-template-columns: 120px 1fr; }
    .feat-stack-img { width: 120px; }
    .news-grid { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 560px) {
    .news-grid { grid-template-columns: 1fr; }
    .feat-stack-card { grid-template-columns: 1fr; }
    .feat-stack-img { width: 100%; height: 160px; }
  }
`;

export default function News() {
  const [activeCat, setActiveCat] = useState("All");
  const navigate = useNavigate();

  const go = (id) => navigate(`/news/${id}`);

  const featured = news.filter((n) => n.featured).slice(0, 4);
  const featHero = featured[0];
  const featStack = featured.slice(1, 4);

  const secondary =
    activeCat === "All"
      ? news.filter((n) => !n.featured)
      : news.filter((n) => n.category === activeCat);

  return (
    <>
      <style>{CSS}</style>
      <div className="news-page">
        {/* ── HEADER ── */}
        <div className="news-header">
          <h1>News</h1>
          <div className="news-cats">
            {categories.map((c) => (
              <button
                key={c}
                className={`news-cat-btn${activeCat === c ? " active" : ""}`}
                onClick={() => setActiveCat(c)}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="news-body">
          {/* ── FEATURED BLOCK ── */}
          {activeCat === "All" && featHero && (
            <div className="featured-wrap">
              {/* Big hero left */}
              <div className="feat-hero" onClick={() => go(featHero.id)}>
                <img src={featHero.hero} alt={featHero.title} />
                <div className="feat-hero-scrim" />
                <div className="feat-hero-body">
                  <span className="cat-tag-light">{featHero.category}</span>
                  <p className="title-xl">{featHero.title}</p>
                  <p
                    className="excerpt"
                    style={{ color: "rgba(255,255,255,0.6)", marginBottom: 0 }}
                  >
                    {featHero.excerpt}
                  </p>
                  <button className="read-link">
                    Read more <ChevronRight size={13} />
                  </button>
                  <p className="meta-white" style={{ marginTop: 14 }}>
                    {featHero.date} · {featHero.readTime}
                  </p>
                </div>
              </div>

              {/* Stack of 3 right */}
              <div className="feat-stack">
                {featStack.map((a) => (
                  <div
                    key={a.id}
                    className="feat-stack-card"
                    onClick={() => go(a.id)}
                  >
                    <div className="feat-stack-img-wrap">
                      <img
                        className="feat-stack-img"
                        src={a.hero}
                        alt={a.title}
                      />
                    </div>
                    <div className="feat-stack-body">
                      <span className="cat-tag">{a.category}</span>
                      <p className="title-md">{a.title}</p>
                      <p className="meta">
                        {a.date} · {a.readTime}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── MORE NEWS ── */}
          <p className="section-label">
            {activeCat === "All" ? "More News" : activeCat}
          </p>
          <div className="news-grid">
            {secondary.map((a) => (
              <div key={a.id} className="news-card" onClick={() => go(a.id)}>
                <div className="news-card-img-wrap">
                  <img src={a.hero} alt={a.title} />
                </div>
                <div className="news-card-body">
                  <span className="cat-tag">{a.category}</span>
                  <p className="title-sm">{a.title}</p>
                  <p
                    className="excerpt"
                    style={{ fontSize: "0.78rem", marginBottom: 10 }}
                  >
                    {a.excerpt}
                  </p>
                  <p className="meta">
                    {a.date} · {a.readTime}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
