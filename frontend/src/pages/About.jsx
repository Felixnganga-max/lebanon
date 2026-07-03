import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ChevronDown,
  Code,
  BarChart3,
  Briefcase,
  Shield,
  Globe,
  Building2,
  GraduationCap,
  Award,
  Users,
  Target,
  BookOpen,
  HeartHandshake,
  TrendingUp,
  Lightbulb,
} from "lucide-react";
import { assets } from "../assets/assets";
/* ─── HOOKS ─── */

function useScrollProgress(ref) {
  const [p, setP] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const wh = window.innerHeight;
      const start = rect.top - wh;
      const end = rect.bottom;
      const total = end - start;
      const current = wh - rect.top;
      setP(Math.max(0, Math.min(1, current / total)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [ref]);
  return p;
}

function useInView(ref, threshold = 0.15) {
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setV(true);
          obs.unobserve(el);
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return v;
}

function useMouseParallax(intensity = 20) {
  const [off, setOff] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e) => {
      setOff({
        x: (e.clientX / window.innerWidth - 0.5) * intensity,
        y: (e.clientY / window.innerHeight - 0.5) * intensity,
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [intensity]);
  return off;
}

/* ─── PRIMITIVES ─── */

function FadeIn({ children, delay = 0, direction = "up", className = "" }) {
  const ref = useRef(null);
  const visible = useInView(ref);
  const transforms = {
    up: "translateY(60px)",
    down: "translateY(-60px)",
    left: "translateX(60px)",
    right: "translateX(-60px)",
    none: "translate(0,0)",
  };
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translate(0,0)" : transforms[direction],
        transition: `all 1s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
        willChange: "transform, opacity",
      }}
    >
      {children}
    </div>
  );
}

function ParallaxImg({ src, speed = 0.3, className = "" }) {
  const ref = useRef(null);
  const progress = useScrollProgress(ref);
  const y = (progress - 0.5) * speed * 200;
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <img
        src={src}
        alt=""
        className="w-full h-full object-cover scale-125"
        style={{ transform: `translateY(${y}px)`, willChange: "transform" }}
      />
    </div>
  );
}

function Counter({ end, suffix = "", delay = 0 }) {
  const ref = useRef(null);
  const visible = useInView(ref);
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!visible) return;
    const start = performance.now();
    const tick = (now) => {
      const elapsed = now - start - delay * 1000;
      if (elapsed < 0) {
        requestAnimationFrame(tick);
        return;
      }
      const p = Math.min(elapsed / 2000, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.floor(eased * end));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [visible, end, delay]);
  return (
    <div ref={ref} className="text-center">
      <div className="text-5xl sm:text-6xl font-extrabold text-white mb-2">
        {count}
        {suffix}
      </div>
    </div>
  );
}

function Marquee({ children, speed = 30, reverse = false }) {
  return (
    <div className="overflow-hidden whitespace-nowrap">
      <div
        className="inline-flex animate-marquee"
        style={{
          animationDuration: `${speed}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {[...Array(4)].map((_, i) => (
          <span key={i} className="inline-flex items-center mx-8">
            {children}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── DATA ─── */

const categories = [
  {
    id: "digital",
    name: "Digital & Tech",
    icon: <Code size={24} />,
    count: 3,
    color: "#2563eb",
  },
  {
    id: "data",
    name: "Data & Analytics",
    icon: <BarChart3 size={24} />,
    count: 6,
    color: "#059669",
  },
  {
    id: "leadership",
    name: "Leadership & Mgmt",
    icon: <Briefcase size={24} />,
    count: 10,
    color: "#111184",
  },
  {
    id: "compliance",
    name: "Compliance & Safety",
    icon: <Shield size={24} />,
    count: 5,
    color: "#dc2626",
  },
  {
    id: "ngo",
    name: "NGO & Development",
    icon: <Globe size={24} />,
    count: 13,
    color: "#d97706",
  },
  {
    id: "business",
    name: "Business",
    icon: <Building2 size={24} />,
    count: 5,
    color: "#7c3aed",
  },
  {
    id: "specialized",
    name: "Specialized",
    icon: <GraduationCap size={24} />,
    count: 3,
    color: "#0891b2",
  },
];

const values = [
  { icon: <Award size={20} />, word: "Excellence" },
  { icon: <Target size={20} />, word: "Integrity" },
  { icon: <Users size={20} />, word: "Inclusivity" },
  { icon: <Lightbulb size={20} />, word: "Innovation" },
  { icon: <HeartHandshake size={20} />, word: "Collaboration" },
  { icon: <TrendingUp size={20} />, word: "Empowerment" },
  { icon: <BookOpen size={20} />, word: "Sustainability" },
  { icon: <Users size={20} />, word: "Teamwork" },
];

/* Hero gallery — deliberately uneven spans (Unsplash-style masonry).
   `col`/`row` are grid-span counts applied via inline style so the
   pattern reflows cleanly whether the grid has 2 columns (mobile)
   or 3 columns (desktop), thanks to grid-flow-dense. */
const heroImages = [
  {
    src: assets.hero,
    col: 1,
    row: 2,
    delay: 0.2,
  },
  {
    src: assets.s5,
    col: 2,
    row: 1,
    delay: 0.3,
  },
  {
    src: assets.hero4,
    col: 1,
    row: 1,
    delay: 0.4,
  },
  {
    src: assets.s7,
    col: 1,
    row: 1,
    delay: 0.5,
  },
  {
    src: assets.s9,
    col: 2,
    row: 1,
    delay: 0.35,
  },
  {
    src: assets.hero3,
    col: 1,
    row: 1,
    delay: 0.45,
  },
];

/* ─── CONNECTING STRING SVG ─── */

function ConnectingString() {
  return (
    <div className="relative h-32 -mb-16 z-10 pointer-events-none overflow-hidden">
      <svg
        className="w-full h-full"
        viewBox="0 0 1440 120"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M0 20 Q 200 100 400 60 T 800 80 T 1200 40 T 1440 100"
          stroke="#F4A261"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          className="opacity-40"
        />
        <path
          d="M0 40 Q 300 0 600 80 T 1000 20 T 1440 60"
          stroke="#2A9D8F"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          className="opacity-30"
        />
      </svg>
    </div>
  );
}

/* ─── SECTIONS ─── */

function Hero() {
  const mouse = useMouseParallax(20);
  const ref = useRef(null);
  const visible = useInView(ref);

  return (
    <section
      ref={ref}
      className="relative min-h-screen overflow-hidden flex items-center bg-[#111184]"
    >
      <div className="absolute inset-0">
        <img
          src={assets.c}
          alt="Campus"
          className="w-full h-full object-cover opacity-30 scale-110"
          style={{
            transform: `translate(${mouse.x * 0.4}px, ${mouse.y * 0.4}px) scale(1.1)`,
            transition: "transform 0.4s ease-out",
          }}
        />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto w-full px-4 sm:px-12 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          <div>
            <FadeIn>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-[2px] w-12 bg-yellow-400" />
                <span className="text-yellow-400 text-xs font-bold uppercase tracking-[0.2em]">
                  About LTTC
                </span>
              </div>
            </FadeIn>

            <div className="overflow-hidden mb-6">
              <h1
                className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white uppercase leading-[0.95] tracking-tight"
                style={{
                  fontFamily: "'Tenor Sans', serif",
                  transform: visible ? "translateY(0)" : "translateY(110%)",
                  opacity: visible ? 1 : 0,
                  transition: "all 1.1s cubic-bezier(0.16,1,0.3,1) 0.2s",
                }}
              >
                Training
                <br />
                <span className="text-yellow-400">Competent</span>
                <br />
                Professionals
              </h1>
            </div>

            <FadeIn delay={0.4}>
              <p className="text-white/50 text-base sm:text-lg max-w-md mb-8">
                NITA accredited. Industry-aligned. Results-driven.
              </p>
            </FadeIn>

            <FadeIn delay={0.6}>
              <a
                href="#nita"
                className="group inline-flex items-center gap-2 text-white/60 hover:text-white text-sm font-bold uppercase tracking-widest transition-colors"
              >
                Discover More
                <ChevronDown size={18} className="animate-bounce" />
              </a>
            </FadeIn>
          </div>

          {/* Gallery — now visible on every breakpoint, laid out as an
              uneven, sharp-edged Unsplash-style masonry grid. */}
          <div className="relative">
            <div
              className="absolute -top-6 -right-6 w-24 h-24 bg-yellow-400/20 rotate-12 -z-10"
              style={{
                transform: `translate(${mouse.x * 1.2}px, ${mouse.y * 1.2}px) rotate(12deg)`,
              }}
            />
            <div
              className="absolute -bottom-4 -left-4 w-20 h-20 bg-[#dc2626]/20 -z-10"
              style={{
                transform: `translate(${mouse.x * -0.8}px, ${mouse.y * -0.8}px)`,
              }}
            />

            <div className="grid grid-cols-2 sm:grid-cols-3 auto-rows-[104px] sm:auto-rows-[130px] gap-2 sm:gap-3 grid-flow-row-dense">
              {heroImages.map((img, i) => (
                <div
                  key={i}
                  style={{
                    gridColumn: `span ${img.col}`,
                    gridRow: `span ${img.row}`,
                  }}
                >
                  <FadeIn
                    delay={img.delay}
                    direction="right"
                    className="h-full w-full"
                  >
                    <div className="overflow-hidden shadow-xl h-full w-full">
                      <img
                        src={img.src}
                        alt=""
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                  </FadeIn>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full">
        <svg viewBox="0 0 1440 100" fill="none" className="w-full">
          <path
            d="M0 100V50C360 0 720 0 1080 30C1260 45 1350 60 1440 50V100H0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   YOUSIGN-STYLE SECTIONS — EXACT LAYOUT
   ═══════════════════════════════════════════ */

function NITASection() {
  return (
    <section id="nita" className="py-32 bg-white relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Two overlapping images — SHARP EDGES */}
          <FadeIn direction="right">
            <div className="relative">
              {/* Back image (offset) */}
              <div className="absolute top-8 left-8 w-full h-full bg-[#F4A261]/30 -z-10" />
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-[#111184]/5 -z-10" />

              {/* Main image */}
              <div className="overflow-hidden shadow-xl">
                <img
                  src={assets.c}
                  alt="Training"
                  className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Overlapping second image */}
              <div className="absolute -bottom-12 -right-12 w-48 h-48 overflow-hidden shadow-xl border-4 border-white">
                <img
                  src={assets.card5}
                  alt="Classroom"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </FadeIn>

          {/* Right: Text */}
          <div className="lg:pl-12">
            <FadeIn direction="left" delay={0.1}>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#111184]/5 mb-8">
                <Award size={16} className="text-[#dc2626]" />
                <span className="text-[#111184] text-xs font-semibold tracking-wide">
                  NITA Accredited
                </span>
              </div>
            </FadeIn>

            <FadeIn direction="left" delay={0.2}>
              <h2
                className="text-4xl sm:text-5xl lg:text-6xl font-normal text-[#111184] leading-[1.1] tracking-tight mb-6"
                style={{ fontFamily: "'Tenor Sans', serif" }}
              >
                Empowering
                <br />
                <span className="italic">Individuals</span>
                <br />& Organizations
              </h2>
            </FadeIn>

            <FadeIn direction="left" delay={0.3}>
              <p className="text-gray-500 text-base leading-relaxed max-w-sm">
                Through Continuous Professional Development.
              </p>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}

function CategoriesSection() {
  const scrollRef = useRef(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);

  const check = () => {
    const el = scrollRef.current;
    if (!el) return;
    setShowLeft(el.scrollLeft > 10);
    setShowRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    check();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      el.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, []);

  const scroll = (dir) =>
    scrollRef.current?.scrollBy({ left: dir * 280, behavior: "smooth" });

  return (
    <section className="py-24 bg-[#FAFAF9]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-12">
        <FadeIn>
          <div className="mb-14">
            <span className="text-gray-400 text-sm font-medium tracking-wide">
              What We Offer
            </span>
            <h2
              className="text-4xl sm:text-5xl font-normal text-[#111184] leading-[1.1] tracking-tight mt-3"
              style={{ fontFamily: "'Tenor Sans', serif" }}
            >
              7 Program Categories
            </h2>
          </div>
        </FadeIn>

        <div className="relative -mx-4 px-4 sm:mx-0 sm:px-0">
          {showLeft && (
            <button
              onClick={() => scroll(-1)}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white shadow-lg flex items-center justify-center text-[#111184] hover:bg-[#111184] hover:text-white transition-colors"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
          )}

          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {categories.map((cat, i) => (
              <FadeIn key={cat.id} delay={i * 0.06} direction="up">
                <div className="flex-shrink-0 w-[240px] group">
                  <div className="bg-white p-6 border border-gray-100 hover:border-[#111184]/10 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer h-full">
                    <div
                      className="w-10 h-10 flex items-center justify-center mb-4 transition-colors duration-300"
                      style={{ backgroundColor: `${cat.color}10` }}
                    >
                      <span style={{ color: cat.color }}>{cat.icon}</span>
                    </div>
                    <h3 className="text-[#111184] font-semibold text-sm tracking-tight mb-1">
                      {cat.name}
                    </h3>
                    <p className="text-gray-400 text-xs font-medium">
                      {cat.count} Programs
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {showRight && (
            <button
              onClick={() => scroll(1)}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white shadow-lg flex items-center justify-center text-[#111184] hover:bg-[#111184] hover:text-white transition-colors"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

function ApproachSection() {
  return (
    <section className="py-32 bg-white relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <div className="lg:order-1">
            <FadeIn direction="left">
              <span className="text-gray-400 text-sm font-medium tracking-wide">
                Our Approach
              </span>
            </FadeIn>

            <FadeIn direction="left" delay={0.1}>
              <h2
                className="text-4xl sm:text-5xl lg:text-6xl font-normal text-[#111184] leading-[1.1] tracking-tight mt-3 mb-8"
                style={{ fontFamily: "'Tenor Sans', serif" }}
              >
                Making it easy
                <br />
                to say <span className="italic">"yes"</span>
              </h2>
            </FadeIn>

            <FadeIn direction="left" delay={0.2}>
              <p className="text-gray-500 text-base leading-relaxed max-w-md mb-6">
                Thousands of forward-thinking professionals choose LTTC to power
                their careers. Our platform streamlines learning, secures
                certifications, and enables superior outcomes.
              </p>
            </FadeIn>

            <FadeIn direction="left" delay={0.3}>
              <p className="text-gray-500 text-base leading-relaxed max-w-md">
                No matter your background or budget, everyone deserves access to
                world-class training.
              </p>
            </FadeIn>
          </div>

          {/* Right: Two overlapping images — SHARP EDGES */}
          <FadeIn direction="right" delay={0.2}>
            <div className="relative lg:order-2">
              {/* Curved line decoration */}
              <svg
                className="absolute -top-12 -left-12 w-32 h-32 text-[#F4A261]/30"
                viewBox="0 0 100 100"
                fill="none"
              >
                <path
                  d="M10 90 Q 50 10 90 50"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>

              {/* Back image (offset) */}
              <div className="absolute top-6 right-6 w-full h-full bg-[#F4A261]/20 -z-10" />

              {/* Main image */}
              <div className="overflow-hidden shadow-xl">
                <img
                  src={assets.hero5}
                  alt="Learning"
                  className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Overlapping second image */}
              <div className="absolute -bottom-10 -left-10 w-44 h-44 overflow-hidden shadow-xl border-4 border-white">
                <img
                  src={assets.card1}
                  alt="Collaboration"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

function PhilosophySection() {
  return (
    <section className="py-32 bg-[#FAFAF9] relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Two overlapping images — SHARP EDGES */}
          <FadeIn direction="right">
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-40 h-40 bg-[#2A9D8F]/10 rounded-full -z-10" />
              <div className="absolute -bottom-8 -right-8 w-48 h-32 bg-[#E9C46A]/15 -z-10" />

              {/* Back image (offset) */}
              <div className="absolute top-8 left-8 w-full h-full bg-[#111184]/5 -z-10" />

              {/* Main image */}
              <div className="overflow-hidden shadow-xl">
                <img
                  src={assets.hero1}
                  alt="Collaboration"
                  className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Overlapping second image */}
              <div className="absolute -bottom-12 -right-12 w-48 h-48 overflow-hidden shadow-xl border-4 border-[#FAFAF9]">
                <img
                  src={assets.card4}
                  alt="Team"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </FadeIn>

          {/* Right: Text */}
          <div>
            <FadeIn direction="left" delay={0.1}>
              <span className="text-gray-400 text-sm font-medium tracking-wide">
                Our Philosophy
              </span>
            </FadeIn>

            <FadeIn direction="left" delay={0.2}>
              <h2
                className="text-4xl sm:text-5xl font-normal text-[#111184] leading-[1.1] tracking-tight mt-3 mb-8"
                style={{ fontFamily: "'Tenor Sans', serif" }}
              >
                Solutions based on
                <br />
                <span className="italic">security</span> and
                <br />
                <span className="italic">simplicity</span>
              </h2>
            </FadeIn>

            <FadeIn direction="left" delay={0.3}>
              <p className="text-gray-500 text-base leading-relaxed max-w-md">
                We are committed to delivering a seamless experience with
                compliance at its core. Our programs are industry-aligned and
                legally recognized, so our learners can focus on growth and less
                on paperwork.
              </p>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}

function ValuesSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-12">
        <FadeIn>
          <div className="mb-14">
            <span className="text-gray-400 text-sm font-medium tracking-wide">
              What Drives Us
            </span>
            <h2
              className="text-4xl sm:text-5xl font-normal text-[#111184] leading-[1.1] tracking-tight mt-3"
              style={{ fontFamily: "'Tenor Sans', serif" }}
            >
              Core Values
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {values.map((v, i) => (
            <FadeIn key={v.word} delay={i * 0.06} direction="up">
              <div className="group bg-[#FAFAF9] p-6 hover:bg-[#111184] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg text-center">
                <div className="w-10 h-10 bg-white group-hover:bg-white/10 flex items-center justify-center mx-auto mb-3 text-[#111184] group-hover:text-yellow-400 transition-colors duration-300">
                  {v.icon}
                </div>
                <span className="text-[#111184] group-hover:text-white font-semibold text-sm tracking-tight transition-colors duration-300">
                  {v.word}
                </span>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatsSection() {
  return (
    <section className="relative py-28 overflow-hidden">
      <div className="absolute inset-0">
        <ParallaxImg src={assets.s6} speed={0.25} className="h-full w-full" />
        <div className="absolute inset-0 bg-[#111184]/88" />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-12">
        <FadeIn>
          <div className="text-center mb-16">
            <span className="text-yellow-400 text-sm font-medium tracking-wide">
              By The Numbers
            </span>
          </div>
        </FadeIn>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <Counter end={98} suffix="%" delay={0} />
          <Counter end={5000} suffix="+" delay={0.1} />
          <Counter end={40} suffix="+" delay={0.2} />
          <Counter end={7} delay={0.3} />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mt-4">
          {[
            "Employment Rate",
            "Trained Professionals",
            "Programs",
            "Categories",
          ].map((label) => (
            <div key={label} className="text-center">
              <div className="text-sm font-medium tracking-wide text-white/40">
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TeamSection() {
  return (
    <section className="py-32 bg-[#FAFAF9] relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Two overlapping images — SHARP EDGES */}
          <FadeIn direction="right">
            <div className="relative">
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-[#E9C46A]/20 rounded-full -z-10" />
              <div className="absolute -bottom-4 -left-4 w-full h-full bg-[#111184]/5 -z-10" />

              {/* Back image (offset) */}
              <div className="absolute top-6 left-6 w-full h-full bg-[#2A9D8F]/10 -z-10" />

              {/* Main image */}
              <div className="overflow-hidden shadow-xl">
                <img
                  src={assets.hero4}
                  alt="Team"
                  className="w-full h-[400px] object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Overlapping second image */}
              <div className="absolute -bottom-10 -right-10 w-44 h-44 overflow-hidden shadow-xl border-4 border-[#FAFAF9]">
                <img
                  src={assets.s7}
                  alt="Workshop"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </FadeIn>

          {/* Right: Text */}
          <div>
            <FadeIn direction="left" delay={0.1}>
              <span className="text-gray-400 text-sm font-medium tracking-wide">
                The People
              </span>
            </FadeIn>

            <FadeIn direction="left" delay={0.2}>
              <h2
                className="text-4xl sm:text-5xl font-normal text-[#111184] leading-[1.1] tracking-tight mt-3 mb-6"
                style={{ fontFamily: "'Tenor Sans', serif" }}
              >
                Our team is always
                <br />
                <span className="italic">growing</span>
              </h2>
            </FadeIn>

            <FadeIn direction="left" delay={0.3}>
              <p className="text-gray-500 text-base leading-relaxed max-w-md mb-8">
                LTTC was founded with a vision to transform professional
                education in East Africa. Headquartered in Kenya, we power
                skills development for thousands of professionals worldwide. Our
                team is growing, and looking for like-minded people.
              </p>
            </FadeIn>

            <FadeIn delay={0.4}>
              <a
                href="/programs"
                className="inline-flex items-center gap-2 bg-[#dc2626] hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-full text-sm transition-all"
              >
                View Programs
                <ArrowRight size={14} />
              </a>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}

function PartnersSection() {
  const partners = [
    "UNICEF",
    "World Bank",
    "Red Cross",
    "Save the Children",
    "GIZ",
    "USAID",
    "NITA",
    "KNBS",
  ];
  return (
    <section className="py-16 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-12">
        <FadeIn>
          <div className="text-center mb-10">
            <span className="text-gray-400 text-sm font-medium tracking-wide">
              Trusted Partners
            </span>
          </div>
        </FadeIn>
        <Marquee speed={20}>
          {partners.map((p) => (
            <span
              key={p}
              className="text-xl sm:text-2xl font-normal text-gray-300 hover:text-[#111184] transition-colors cursor-default tracking-tight"
              style={{ fontFamily: "'Tenor Sans', serif" }}
            >
              {p}
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="relative py-28 overflow-hidden">
      <div className="absolute inset-0">
        <ParallaxImg
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600&q=80"
          speed={0.2}
          className="h-full w-full"
        />
        <div className="absolute inset-0 bg-[#111184]/85" />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-12 text-center">
        <FadeIn>
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-normal text-white leading-[1.1] tracking-tight mb-4"
            style={{ fontFamily: "'Tenor Sans', serif" }}
          >
            Ready to transform
            <br />
            <span className="italic">your career?</span>
          </h2>
        </FadeIn>

        <FadeIn delay={0.2}>
          <p className="text-white/50 text-base max-w-sm mx-auto mb-10">
            Join 5,000+ professionals who advanced with LTTC.
          </p>
        </FadeIn>

        <FadeIn delay={0.4}>
          <a
            href="/programs"
            className="group inline-flex items-center gap-2 bg-[#dc2626] hover:bg-red-700 text-white font-semibold py-4 px-10 rounded-full text-sm transition-all shadow-lg hover:shadow-red-500/30"
          >
            Explore Programs
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </a>
        </FadeIn>
      </div>
    </section>
  );
}

/* ─── MAIN ─── */

export default function About() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee linear infinite;
        }
      `}</style>

      <Hero />
      <NITASection />
      <ConnectingString />
      <CategoriesSection />
      <ConnectingString />
      <ApproachSection />
      <ConnectingString />
      <PhilosophySection />
      <ConnectingString />
      <ValuesSection />
      <StatsSection />
      <TeamSection />
      <PartnersSection />
      <CTASection />
    </div>
  );
}
