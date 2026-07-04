import { useEffect, useRef, useState, useCallback } from "react";
import { slides } from "../data/data";
import { useFrameColor } from "../context/FrameColorContext";

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState("next");
  const autoPlayRef = useRef(null);
  const touchStartX = useRef(0);
  const { setColor } = useFrameColor();

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

  // Sync the navbar's frame color to the current slide; reset on unmount
  useEffect(() => {
    setColor(slide.boxColor);
    return () => setColor("transparent");
  }, [slide.boxColor, setColor]);

  return (
    <main
      className="relative w-full"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseEnter={() => clearInterval(autoPlayRef.current)}
      onMouseLeave={() => {
        autoPlayRef.current = setInterval(next, 6000);
      }}
    >
      {/* ─── FULL-BLEED IMAGE ─── */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          height: "62vh",
          minHeight: "380px",
        }}
      >
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
                  "linear-gradient(180deg, rgba(10,10,60,0.05) 0%, rgba(10,10,60,0.22) 100%)",
              }}
            />
          </div>
        ))}

        <button
          onClick={prev}
          className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center transition-all duration-200 hover:scale-110"
          style={{
            background: "rgba(255,255,255,0.16)",
            border: "none",
            color: "#fff",
            width: "44px",
            height: "44px",
            borderRadius: "50%",
            cursor: "pointer",
            padding: 0,
          }}
          aria-label="Previous slide"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            width={20}
            height={20}
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button
          onClick={next}
          className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center transition-all duration-200 hover:scale-110"
          style={{
            background: "rgba(255,255,255,0.16)",
            border: "none",
            color: "#fff",
            width: "44px",
            height: "44px",
            borderRadius: "50%",
            cursor: "pointer",
            padding: 0,
          }}
          aria-label="Next slide"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            width={20}
            height={20}
          >
            <polyline points="9 6 15 12 9 18" />
          </svg>
        </button>

        <div className="absolute bottom-5 right-6 z-30 flex gap-2.5 items-center">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i, i > current ? "next" : "prev")}
              style={{
                width: i === current ? "26px" : "6px",
                height: "6px",
                backgroundColor:
                  i === current ? "#ffffff" : "rgba(255,255,255,0.45)",
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

        {/* ─── CURVED COLOR SWOOP — overlaps bottom-left of the photo, curves up and to the right ─── */}
        <div
          className="lttc-hero-swoop transition-colors duration-700"
          style={{
            position: "absolute",
            left: 0,
            bottom: 0,
            zIndex: 20,
            backgroundColor: slide.boxColor,
            borderTopRightRadius: "220px",
          }}
        >
          <div key={current} className="animate-slideIn">
            <h1
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: "-0.01em",
                textTransform: "uppercase",
                color: "#ffffff",
                margin: 0,
                whiteSpace: "pre-line",
              }}
            >
              {slide.headline}
            </h1>
          </div>
        </div>
      </div>

      {/* ─── COLOR BAND — same color, continues flush beneath the image, holds subtext + contact info ─── */}
      <div
        className="transition-colors duration-700"
        style={{
          backgroundColor: slide.boxColor,
          padding: "20px 24px 32px",
        }}
      >
        <p
          style={{
            fontSize: "0.78rem",
            fontWeight: 500,
            letterSpacing: "0.02em",
            lineHeight: 1.7,
            color: "rgba(255,255,255,0.85)",
            margin: "0 0 24px",
            maxWidth: "480px",
          }}
        >
          {slide.subtext}
        </p>

        {/* ─── CONTACT CARD ─── */}
        <div
          style={{
            marginTop: "8px",
            background: "#ffffff",
            borderRadius: "1.1rem",
            padding: "24px 28px",
            boxShadow: "0 12px 32px rgba(0,0,0,0.14)",
            maxWidth: "620px",
          }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-6 sm:gap-8">
            {/* Contact */}
            <div>
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
                  stroke={slide.boxColor}
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
                    color: "#7a8199",
                    margin: 0,
                  }}
                >
                  Contact
                </p>
              </div>
              <p
                style={{
                  fontSize: "0.78rem",
                  color: "#1a1a2e",
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
              className="hidden sm:block"
              style={{
                width: "1px",
                background: "rgba(0,0,0,0.1)",
                alignSelf: "stretch",
              }}
            />

            {/* Admissions */}
            <div>
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
                  stroke={slide.boxColor}
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
                    color: "#7a8199",
                    margin: 0,
                  }}
                >
                  Admissions
                </p>
              </div>
              <p
                style={{
                  fontSize: "0.78rem",
                  color: "#4a4a6a",
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
                  color: slide.boxColor,
                  textDecoration: "none",
                  fontWeight: 600,
                  letterSpacing: "0.01em",
                }}
              >
                admissions@lebanonttc.co.ke
              </a>
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
        .lttc-hero-swoop {
          width: min(560px, 55%);
          padding: 32px 40px 28px 32px;
        }
        @media (max-width: 900px) {
          .lttc-hero-swoop {
            width: 74%;
            border-top-right-radius: 140px;
            padding: 24px 28px 22px 20px;
          }
        }
        @media (max-width: 560px) {
          .lttc-hero-swoop {
            width: 82%;
            border-top-right-radius: 90px;
            padding: 20px 22px 18px 18px;
          }
        }
      `}</style>
    </main>
  );
}
