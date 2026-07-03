import { useEffect, useRef, useState, useCallback } from "react";
import { slides } from "../data/data";

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState("next");
  const autoPlayRef = useRef(null);
  const touchStartX = useRef(0);

  const goTo = useCallback(
    (index, dir = "next") => {
      if (isAnimating || index === current) return;
      setIsAnimating(true);
      setDirection(dir);
      setCurrent(index);
      setTimeout(() => setIsAnimating(false), 700);
    },
    [isAnimating, current],
  );

  const next = useCallback(() => {
    goTo((current + 1) % slides.length, "next");
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length, "prev");
  }, [current, goTo]);

  useEffect(() => {
    autoPlayRef.current = setInterval(next, 6000);
    return () => clearInterval(autoPlayRef.current);
  }, [next]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) next();
      else prev();
    }
  };

  const slide = slides[current];

  // Parse boxColor into an rgba overlay — very faint, 14% opacity
  const hexToRgba = (hex, alpha) => {
    const h = hex.replace("#", "");
    const r = parseInt(h.substring(0, 2), 16);
    const g = parseInt(h.substring(2, 4), 16);
    const b = parseInt(h.substring(4, 6), 16);
    return `rgba(${r},${g},${b},${alpha})`;
  };

  return (
    <main
      className="relative w-full flex flex-col bg-gray-50"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseEnter={() => clearInterval(autoPlayRef.current)}
      onMouseLeave={() => {
        autoPlayRef.current = setInterval(next, 6000);
      }}
    >
      {/* ─── CAROUSEL ─── */}
      <div
        className="relative w-full"
        style={{ height: "80vh", minHeight: "400px" }}
      >
        <div className="relative w-full h-full overflow-hidden">
          {slides.map((s, i) => (
            <div
              key={i}
              className="absolute inset-0 w-full h-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{
                transform:
                  i === current
                    ? "translateX(0)"
                    : direction === "next"
                      ? i < current
                        ? "translateX(-100%)"
                        : "translateX(100%)"
                      : i > current
                        ? "translateX(100%)"
                        : "translateX(-100%)",
                zIndex: i === current ? 2 : 1,
              }}
            >
              <img
                src={s.image}
                alt=""
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center 30%",
                }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(130deg, rgba(10,10,60,0.28) 0%, transparent 55%)",
                }}
              />
              <div
                className="absolute inset-0 transition-colors duration-700"
                style={{
                  background: hexToRgba(s.boxColor, 0.13),
                  mixBlendMode: "multiply",
                }}
              />
            </div>
          ))}

          <button
            onClick={prev}
            className="absolute left-5 sm:left-7 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center transition-all duration-200 hover:scale-110"
            style={{
              background: "none",
              border: "none",
              color: "rgba(255,255,255,0.85)",
              width: "88px",
              height: "88px",
              cursor: "pointer",
              padding: 0,
            }}
            aria-label="Previous slide"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              width={68}
              height={68}
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            onClick={next}
            className="absolute right-5 sm:right-7 top-1/2 -translate-y-1/2 z-20 flex items-center justify-center transition-all duration-200 hover:scale-110"
            style={{
              background: "none",
              border: "none",
              color: "rgba(255,255,255,0.85)",
              width: "88px",
              height: "88px",
              cursor: "pointer",
              padding: 0,
            }}
            aria-label="Next slide"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              width={68}
              height={68}
            >
              <polyline points="9 6 15 12 9 18" />
            </svg>
          </button>

          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 flex gap-2.5 items-center">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i, i > current ? "next" : "prev")}
                style={{
                  width: i === current ? "28px" : "6px",
                  height: "6px",
                  backgroundColor:
                    i === current ? "#ffffff" : "rgba(255,255,255,0.4)",
                  borderRadius: "9999px",
                  border: "none",
                  padding: 0,
                  cursor: "pointer",
                  transition: "width 320ms ease, background 320ms ease",
                }}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ─── BOTTOM ROW ─── */}
      {/* Grid, not flex+justify-between: on lg+ the two tracks sum to 100% of the
          width so there's no dead gap in the middle. On mobile both cards stack
          full-width and actually use the space instead of leaving it blank. */}
      <div
        className="relative w-full px-5 sm:px-12"
        style={{ marginTop: "-64px" }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,460px)_1fr] gap-4 lg:gap-0 items-start">
          {/* LEFT — slide text card */}
          <div
            className="relative z-20 shadow-2xl w-full transition-colors duration-500"
            style={{
              backgroundColor: slide.boxColor,
              borderTopRightRadius: "1.25rem",
              borderTopLeftRadius: "1.25rem",
              padding: "26px 24px 30px",
            }}
          >
            <div key={current} className="animate-slideIn">
              <h1
                style={{
                  fontFamily: "'Tenor Sans', serif",
                  fontSize: "clamp(1.25rem, 2.4vw, 1.8rem)",
                  fontWeight: 400,
                  lineHeight: 1.22,
                  letterSpacing: "-0.01em",
                  color: slide.textColor,
                  margin: "0 0 8px",
                  whiteSpace: "pre-line",
                }}
              >
                {slide.headline}
              </h1>
              <p
                style={{
                  fontSize: "clamp(0.68rem, 1.1vw, 0.78rem)",
                  fontWeight: 400,
                  letterSpacing: "0.03em",
                  lineHeight: 1.65,
                  color: slide.textColor,
                  opacity: 0.72,
                  margin: "0 0 22px",
                  maxWidth: "340px",
                }}
              >
                {slide.subtext}
              </p>
              <div className="flex flex-wrap gap-3">
                <button
                  style={{
                    backgroundColor: slide.btnPrimaryBg,
                    color: slide.btnPrimaryText,
                    fontSize: "0.65rem",
                    fontWeight: 600,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    padding: "9px 20px",
                    borderRadius: "9999px",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  {slide.ctaPrimary}
                </button>
                <button
                  style={{
                    backgroundColor: "transparent",
                    color: slide.btnSecondaryText,
                    border: `1.5px solid ${slide.btnSecondaryBorder}`,
                    fontSize: "0.65rem",
                    fontWeight: 600,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    padding: "9px 20px",
                    borderRadius: "9999px",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      slide.btnSecondaryHover;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  {slide.ctaSecondary}
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT — contact card: Location removed, now Contact + Admissions
              split across the full remaining track so it isn't floating in
              a half-filled column anymore. Visible at every breakpoint. */}
          <div
            className="relative z-20 shadow-xl w-full lg:ml-12 lg:w-1/2"
            style={{
              marginTop: 0,
              backgroundColor: "#111184",
              borderRadius: "1.25rem",
              padding: "24px 28px",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr auto 1fr",
                alignItems: "start",
              }}
            >
              {/* Contact */}
              <div style={{ paddingRight: "2px" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "7px",
                    marginBottom: "8px",
                  }}
                >
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#FACC15"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ flexShrink: 0 }}
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.29 6.29l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <p
                    style={{
                      fontSize: "0.55rem",
                      fontWeight: 700,
                      letterSpacing: "0.11em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.4)",
                      margin: 0,
                    }}
                  >
                    Contact
                  </p>
                </div>
                <p
                  style={{
                    fontSize: "0.78rem",
                    color: "#fff",
                    lineHeight: 1.65,
                    margin: 0,
                  }}
                >
                  +254 105 221 148
                  <br />
                  +254 759 810 287
                </p>
              </div>

              {/* Divider */}
              <div
                style={{
                  width: "1px",
                  background: "rgba(255,255,255,0.13)",
                  alignSelf: "stretch",
                  margin: "0 6px",
                }}
              />

              {/* Mode + Email */}
              <div style={{ paddingLeft: "24px" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "7px",
                    marginBottom: "8px",
                  }}
                >
                  <svg
                    width="13"
                    height="13"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#FACC15"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ flexShrink: 0 }}
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  <p
                    style={{
                      fontSize: "0.55rem",
                      fontWeight: 700,
                      letterSpacing: "0.11em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.4)",
                      margin: 0,
                    }}
                  >
                    Admissions
                  </p>
                </div>
                <p
                  style={{
                    fontSize: "0.78rem",
                    color: "rgba(255,255,255,0.7)",
                    lineHeight: 1.6,
                    margin: "0 0 6px",
                  }}
                >
                  Online · Google Meet
                </p>

                <a
                  href="mailto:admissions@lebanonttc.co.ke"
                  style={{
                    fontSize: "0.73rem",
                    color: "#FACC15",
                    textDecoration: "none",
                    fontWeight: 500,
                    letterSpacing: "0.01em",
                  }}
                >
                  admissions@lebanonttc.co.ke
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-slideIn {
          animation: slideIn 0.55s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
      `}</style>
    </main>
  );
}
