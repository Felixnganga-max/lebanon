import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";
import { news } from "../data/newsData";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400&family=Inter:wght@400;500;600;700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin:0; padding:0; }

  .nd-page {
    min-height: 100vh;
    background: #f9f8f5;
    font-family: 'Inter', sans-serif;
    color: #1a1a2e;
  }

  .nd-hero {
    position: relative;
    height: 60vh; min-height: 420px;
    overflow: hidden;
    background: #0b1060;
  }
  .nd-hero img {
    position: absolute; inset: 0;
    width: 100%; height: 100%;
    object-fit: cover;
    opacity: 0.5;
  }
  .nd-hero-scrim {
    position: absolute; inset: 0;
    background: linear-gradient(to bottom, rgba(8,10,72,0.15) 0%, rgba(8,10,72,0.85) 100%);
  }
  .nd-hero-content {
    position: absolute; inset: 0;
    display: flex; flex-direction: column;
    justify-content: flex-end;
    padding: 0 72px 56px;
    max-width: 860px;
  }
  .nd-back {
    position: absolute;
    top: 28px; left: 48px;
    display: inline-flex; align-items: center; gap: 7px;
    font-size: 0.76rem; font-weight: 700;
    color: rgba(255,255,255,0.7);
    background: none; border: none; cursor: pointer;
    font-family: 'Inter', sans-serif;
    letter-spacing: 0.04em; text-transform: uppercase;
    transition: color 180ms;
  }
  .nd-back:hover { color: #fff; }
  .nd-cat-tag {
    display: inline-block;
    font-size: 0.64rem; font-weight: 700;
    letter-spacing: 0.1em; text-transform: uppercase;
    color: #FACC15; margin-bottom: 14px;
  }
  .nd-hero h1 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.8rem, 4vw, 2.8rem);
    font-weight: 400; color: #fff;
    line-height: 1.15; margin-bottom: 20px;
    max-width: 720px;
  }
  .nd-meta {
    display: flex; align-items: center; gap: 20px;
    font-size: 0.75rem; color: rgba(255,255,255,0.55);
    font-weight: 500;
  }
  .nd-meta-item { display: flex; align-items: center; gap: 6px; }

  .nd-content {
    max-width: 780px;
    margin: 0 auto;
    padding: 60px 48px 96px;
  }
  .nd-intro {
    font-family: 'Playfair Display', serif;
    font-size: 1.22rem;
    font-style: italic;
    color: #374151;
    line-height: 1.8;
    margin-bottom: 40px;
    padding-bottom: 40px;
    border-bottom: 1px solid #e5e7eb;
  }
  .nd-heading {
    font-family: 'Playfair Display', serif;
    font-size: 1.4rem;
    font-weight: 500;
    color: #0b1060;
    margin: 40px 0 16px;
    line-height: 1.25;
  }
  .nd-text {
    font-size: 1rem;
    color: #374151;
    line-height: 1.9;
    margin-bottom: 24px;
  }
  .nd-figure {
    margin: 36px 0;
    border-radius: 4px;
    overflow: hidden;
  }
  .nd-figure img {
    width: 100%; display: block;
    max-height: 460px; object-fit: cover;
  }
  .nd-figure figcaption {
    font-size: 0.76rem;
    color: #9ca3af;
    font-style: italic;
    padding: 10px 0 0;
    border-top: 1px solid #e5e7eb;
    line-height: 1.5;
  }

  .nd-related {
    background: white;
    border-top: 1px solid #e5e7eb;
    padding: 56px 48px;
  }
  .nd-related-inner { max-width: 1100px; margin: 0 auto; }
  .nd-related h2 {
    font-family: 'Playfair Display', serif;
    font-size: 1.5rem; font-weight: 400;
    color: #0b1060; margin-bottom: 32px;
  }
  .nd-related-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }
  .nd-rel-card {
    border: 1px solid #e5e7eb;
    border-radius: 4px;
    overflow: hidden;
    cursor: pointer;
    transition: box-shadow 220ms, transform 220ms;
    background: white;
  }
  .nd-rel-card:hover {
    box-shadow: 0 8px 28px rgba(11,16,96,0.1);
    transform: translateY(-3px);
  }
  .nd-rel-card-img-wrap { overflow: hidden; }
  .nd-rel-card img {
    width: 100%; height: 160px;
    object-fit: cover; display: block;
    transition: transform 500ms;
  }
  .nd-rel-card:hover img { transform: scale(1.05); }
  .nd-rel-body { padding: 16px 18px 20px; }
  .nd-rel-cat {
    font-size: 0.62rem; font-weight: 700;
    letter-spacing: 0.09em; text-transform: uppercase;
    color: #0b1060; background: #eef2ff;
    padding: 2px 8px; border-radius: 3px;
    display: inline-block; margin-bottom: 8px;
  }
  .nd-rel-title {
    font-family: 'Playfair Display', serif;
    font-size: 0.95rem; font-weight: 500;
    color: #0b1060; line-height: 1.35;
    margin-bottom: 6px;
  }
  .nd-rel-date { font-size: 0.7rem; color: #9ca3af; font-weight: 500; }

  .nd-cta {
    background: #0b1060;
    padding: 64px 48px;
    text-align: center;
  }
  .nd-cta p {
    font-size: 0.65rem; font-weight: 700;
    letter-spacing: 0.15em; text-transform: uppercase;
    color: rgba(250,204,21,0.75); margin-bottom: 14px;
  }
  .nd-cta h2 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(1.6rem, 3vw, 2.4rem);
    font-weight: 400; color: #fff;
    margin-bottom: 28px; line-height: 1.2;
  }
  .nd-cta a {
    display: inline-flex; align-items: center; gap: 8px;
    background: #FACC15; color: #0b1060;
    padding: 14px 36px; border-radius: 4px;
    font-size: 0.82rem; font-weight: 700;
    text-decoration: none; letter-spacing: 0.06em; text-transform: uppercase;
    transition: background 180ms, transform 180ms;
  }
  .nd-cta a:hover { background: #fbbf24; transform: translateY(-2px); }

  @media (max-width: 768px) {
    .nd-hero-content { padding: 0 28px 40px; }
    .nd-content { padding: 40px 24px 72px; }
    .nd-related { padding: 48px 24px; }
    .nd-related-grid { grid-template-columns: 1fr; }
    .nd-back { left: 24px; }
    .nd-cta { padding: 48px 24px; }
  }
`;

export default function NewsDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const article = news.find((n) => n.id === id);

  if (!article) {
    return (
      <div
        style={{
          padding: "80px 48px",
          textAlign: "center",
          fontFamily: "Inter,sans-serif",
        }}
      >
        <p style={{ color: "#6b7280", marginBottom: 16 }}>Article not found.</p>
        <button
          onClick={() => navigate("/news")}
          style={{
            color: "#0b1060",
            fontWeight: 700,
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "0.9rem",
          }}
        >
          ← Back to News
        </button>
      </div>
    );
  }

  const related = news
    .filter(
      (n) => n.id !== id && (n.category === article.category || n.featured),
    )
    .slice(0, 3);

  return (
    <>
      <style>{CSS}</style>
      <div className="nd-page">
        <div className="nd-hero">
          <img src={article.hero} alt={article.title} />
          <div className="nd-hero-scrim" />
          <button className="nd-back" onClick={() => navigate("/news")}>
            <ArrowLeft size={14} /> Back to News
          </button>
          <div className="nd-hero-content">
            <span className="nd-cat-tag">{article.category}</span>
            <h1>{article.title}</h1>
            <div className="nd-meta">
              <div className="nd-meta-item">
                <Calendar size={13} /> {article.date}
              </div>
              <div className="nd-meta-item">
                <Clock size={13} /> {article.readTime}
              </div>
              <div className="nd-meta-item">
                <Tag size={13} /> Lebanon TTC
              </div>
            </div>
          </div>
        </div>

        <div className="nd-content">
          {article.body.map((block, i) => {
            if (block.type === "intro")
              return (
                <p key={i} className="nd-intro">
                  {block.text}
                </p>
              );
            if (block.type === "heading")
              return (
                <h2 key={i} className="nd-heading">
                  {block.text}
                </h2>
              );
            if (block.type === "text")
              return (
                <p key={i} className="nd-text">
                  {block.text}
                </p>
              );
            if (block.type === "image")
              return (
                <figure key={i} className="nd-figure">
                  <img src={block.src} alt={block.caption} />
                  {block.caption && <figcaption>{block.caption}</figcaption>}
                </figure>
              );
            return null;
          })}
        </div>

        {related.length > 0 && (
          <div className="nd-related">
            <div className="nd-related-inner">
              <h2>Related Articles</h2>
              <div className="nd-related-grid">
                {related.map((a) => (
                  <div
                    key={a.id}
                    className="nd-rel-card"
                    onClick={() => navigate(`/news/${a.id}`)}
                  >
                    <div className="nd-rel-card-img-wrap">
                      <img src={a.hero} alt={a.title} />
                    </div>
                    <div className="nd-rel-body">
                      <span className="nd-rel-cat">{a.category}</span>
                      <p className="nd-rel-title">{a.title}</p>
                      <p className="nd-rel-date">{a.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="nd-cta">
          <p>Intake Ongoing</p>
          <h2>Ready to transform your career?</h2>
          <a href="/applications">Apply Now →</a>
        </div>
      </div>
    </>
  );
}
