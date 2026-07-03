import { Link } from "react-router-dom";
import { useRef } from "react";
import { useScrollAnimationGroup } from "../hooks/useScrollAnimationGroup";
import { useSplitTextReveal } from "../hooks/useSplitTextReveal";
import { useParallax } from "../hooks/useParallax";
import { assets } from "../assets/assets";

const programs = [
  {
    code: "PD.01",
    title: "Corporate Training",
    img: assets.card2,
  },
  {
    code: "PD.02",
    title: "Executive Workshops",
    img: assets.card3,
  },
  {
    code: "PD.03",
    title: "Certificate Courses",
    img: assets.card4,
  },
  {
    code: "PD.04",
    title: "Skills Bootcamps",
    img: assets.card5,
  },
];

function ProgramCard({ program: p }) {
  const imgRef = useParallax(-0.1);
  const tiltRef = useRef(null);

  const handleMouseMove = (e) => {
    const el = tiltRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 8;
    el.style.transform = `perspective(900px) rotateY(${x}deg) rotateX(${-y}deg)`;
  };

  const handleMouseLeave = () => {
    if (tiltRef.current)
      tiltRef.current.style.transform =
        "perspective(900px) rotateY(0deg) rotateX(0deg)";
  };

  return (
    <div className="shrink-0 snap-start w-[78vw] sm:w-[46vw] md:w-auto">
      {/* Image — tilt on hover, parallax on scroll */}
      <div
        ref={tiltRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative h-64 sm:h-72 overflow-hidden"
        style={{
          transition: "transform 0.25s cubic-bezier(0.16,1,0.3,1)",
          willChange: "transform",
        }}
      >
        <img
          ref={imgRef}
          src={p.img}
          alt=""
          className="absolute inset-0 w-full h-full object-cover scale-110"
          style={{ willChange: "transform" }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(11,16,96,0) 55%, rgba(11,16,96,0.45) 100%)",
          }}
        />
      </div>

      {/* Caption — overlaps the image, corner cut like the Faculty cards */}
      <div
        className="relative z-10 mx-3 -mt-10 sm:-mt-12 px-5 py-4"
        style={{
          background: "#FAF7EF",
          clipPath: "polygon(20px 0, 100% 0, 100% 100%, 0 100%, 0 20px)",
          boxShadow: "0 14px 32px -14px rgba(11,16,96,0.35)",
        }}
      >
        <span
          className="block text-[10px] tracking-[0.2em] uppercase mb-1"
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 600,
            color: "#B8121E",
          }}
        >
          {p.code}
        </span>
        <h3
          className="text-[#0B1060] text-base sm:text-lg leading-snug"
          style={{ fontFamily: "'Tenor Sans', serif", fontWeight: 400 }}
        >
          {p.title}
        </h3>
      </div>
    </div>
  );
}

export default function ProgramCards() {
  const headingRef = useSplitTextReveal({ delay: 0, staggerMs: 50 });
  const cardsRef = useScrollAnimationGroup({
    staggerMs: 150,
    animVars: { ty: "50px", op: "0", sc: "0.97" },
  });

  return (
    <section className="max-w-[1440px] mx-auto w-full px-4 sm:px-12 py-24 overflow-hidden">
      {/* Heading */}
      <div className="flex items-end justify-between gap-6 mb-12 sm:mb-14 flex-wrap">
        <div className="flex items-center gap-4">
          <div
            className="h-[2px] bg-[#B8121E]"
            style={{
              width: "0px",
              animation:
                "expandLine 0.9s cubic-bezier(0.16,1,0.3,1) 0.2s forwards",
            }}
          />
          <h2
            ref={headingRef}
            className="text-2xl sm:text-4xl text-[#0B1060] leading-snug"
            style={{ fontFamily: "'Tenor Sans', serif", fontWeight: 400 }}
          >
            Professional Development
          </h2>
        </div>

        <Link
          to="/programs"
          className="hidden md:inline-block text-[11px] tracking-[0.2em] uppercase text-[#0B1060] border-b border-[#0B1060]/30 pb-1 hover:border-[#B8121E] hover:text-[#B8121E] transition-colors"
          style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600 }}
        >
          View all programs
        </Link>
      </div>

      {/* Gallery: horizontal swipe on mobile, grid from md+ */}
      <div
        ref={cardsRef}
        className="
          flex md:grid md:grid-cols-4
          gap-5 md:gap-6
          overflow-x-auto md:overflow-visible
          snap-x snap-mandatory md:snap-none
          -mx-4 px-4 sm:-mx-12 sm:px-12 md:mx-0 md:px-0
          pb-4 md:pb-0
          scrollbar-hide
        "
      >
        {programs.map((p) => (
          <ProgramCard key={p.code} program={p} />
        ))}
      </div>

      {/* Mobile CTA — desktop link lives in the header row instead */}
      <div className="mt-10 flex justify-center md:hidden">
        <Link
          to="/programs"
          className="text-[11px] tracking-[0.2em] uppercase text-[#0B1060] border-b border-[#0B1060]/30 pb-1"
          style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600 }}
        >
          View all programs
        </Link>
      </div>

      <style>{`
        @keyframes expandLine {
          from { width: 0px; }
          to   { width: 40px; }
        }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}
