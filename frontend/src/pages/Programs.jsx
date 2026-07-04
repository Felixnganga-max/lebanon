import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Monitor,
  Wallet,
  Calendar,
  Users,
  ArrowRight,
} from "lucide-react";
import { assets } from "../assets/assets";
import { categories } from "../data/programData";
import { slugify } from "../data/slugify";

/* ──────────── COMPONENTS ──────────── */

function Hero() {
  const scrollToPrograms = () => {
    document.getElementById("programs")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative w-full h-[70vh] min-h-[500px] overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={assets.hero5}
          alt="Students"
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(17,17,132,0.92) 0%, rgba(17,17,132,0.75) 40%, rgba(17,17,132,0.4) 100%)",
          }}
        />
      </div>

      <div className="relative z-10 h-full max-w-[1440px] mx-auto px-4 sm:px-12 flex flex-col justify-center">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-[2px] w-12 bg-yellow-400" />
            <span className="text-yellow-400 text-xs font-bold uppercase tracking-[0.2em]">
              Professional Development
            </span>
          </div>

          <h1
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] mb-6 uppercase tracking-tight"
            style={{ fontFamily: "'Tenor Sans', serif" }}
          >
            Build Skills.
            <br />
            <span className="text-yellow-400">Shape Futures.</span>
          </h1>

          <p className="text-white/80 text-base sm:text-lg leading-relaxed mb-8 max-w-lg">
            40+ professional programs across 7 categories. Find your path and
            start today.
          </p>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={scrollToPrograms}
              className="group bg-[#dc2626] hover:bg-red-700 text-white font-bold py-4 px-8 uppercase tracking-wider text-sm flex items-center gap-2 transition-all shadow-lg hover:shadow-red-500/30"
            >
              Explore Programs
              <ArrowRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </div>

          <div className="flex gap-8 mt-12 pt-8 border-t border-white/20">
            {[
              { value: "40+", label: "Programs" },
              { value: "7", label: "Categories" },
              { value: "100%", label: "Online" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-2xl font-extrabold text-white">
                  {s.value}
                </div>
                <div className="text-white/60 text-xs uppercase tracking-wider mt-1">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full">
        <svg viewBox="0 0 1440 80" fill="none" className="w-full">
          <path
            d="M0 80V40C240 0 480 0 720 20C960 40 1200 60 1440 40V80H0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
}

function CategoryTabs({ activeId, onSelect }) {
  const scrollRef = useRef(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setShowLeft(el.scrollLeft > 10);
    setShowRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 200, behavior: "smooth" });
  };

  return (
    <div className="relative">
      {/* Left Arrow */}
      {showLeft && (
        <button
          onClick={() => scroll(-1)}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white shadow-md flex items-center justify-center text-[#111184] hover:bg-[#111184] hover:text-white transition-colors"
        >
          <ChevronLeft size={18} />
        </button>
      )}

      {/* Scrollable Tabs */}
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto scrollbar-hide px-1 py-2"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {categories.map((cat) => {
          const isActive = activeId === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelect(cat.id)}
              className={`flex-shrink-0 px-5 py-3 text-sm font-bold uppercase tracking-wider transition-all duration-200 whitespace-nowrap ${
                isActive
                  ? "bg-[#111184] text-white shadow-lg shadow-[#111184]/20"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-[#111184]"
              }`}
            >
              {cat.name}
              <span
                className={`ml-2 text-[10px] px-1.5 py-0.5 ${
                  isActive
                    ? "bg-white/20 text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {cat.programs.length}
              </span>
            </button>
          );
        })}
      </div>

      {/* Right Arrow */}
      {showRight && (
        <button
          onClick={() => scroll(1)}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white shadow-md flex items-center justify-center text-[#111184] hover:bg-[#111184] hover:text-white transition-colors"
        >
          <ChevronRight size={18} />
        </button>
      )}
    </div>
  );
}

function ProgramCard({ program, categoryId }) {
  const cardRef = useRef(null);
  const detailPath = `/programs/${categoryId}/${slugify(program.title)}`;

  const handleMove = (e) => {
    const c = cardRef.current;
    if (!c) return;
    const r = c.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 10;
    const y = ((e.clientY - r.top) / r.height - 0.5) * 10;
    c.style.transform = `perspective(800px) rotateY(${x}deg) rotateX(${-y}deg) scale(1.01)`;
  };

  const handleLeave = () => {
    const c = cardRef.current;
    if (!c) return;
    c.style.transform =
      "perspective(800px) rotateY(0deg) rotateX(0deg) scale(1)";
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="bg-white overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
      style={{
        transition:
          "transform 0.25s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s",
      }}
    >
      <Link to={detailPath} className="block h-48 relative overflow-hidden">
        <img
          src={program.image}
          alt={program.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-4 left-4">
          <span className="bg-[#dc2626] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1">
            Intake Ongoing
          </span>
        </div>
      </Link>

      <div className="p-5">
        <Link to={detailPath}>
          <h4 className="text-[#111184] font-extrabold text-sm uppercase leading-tight mb-3 hover:text-[#dc2626] transition-colors">
            {program.title}
          </h4>
        </Link>

        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="flex items-center gap-1.5">
            <Clock size={12} className="text-[#dc2626]" />
            <span className="text-[11px] text-gray-600 font-medium">
              {program.duration}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Monitor size={12} className="text-[#dc2626]" />
            <span className="text-[11px] text-gray-600 font-medium">
              {program.mode}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Wallet size={12} className="text-[#dc2626]" />
            <span className="text-[11px] text-[#111184] font-bold">
              {program.fee}
            </span>
          </div>
          {program.dates && (
            <div className="flex items-center gap-1.5">
              <Calendar size={12} className="text-[#dc2626]" />
              <span className="text-[11px] text-gray-600 font-medium">
                {program.dates}
              </span>
            </div>
          )}
        </div>

        <p className="text-xs text-gray-500 leading-relaxed mb-3 line-clamp-2">
          {program.description}
        </p>

        <div className="flex items-start gap-1.5 mb-4">
          <Users size={12} className="text-[#dc2626] mt-0.5 flex-shrink-0" />
          <p className="text-[11px] text-gray-500 leading-relaxed">
            <span className="font-semibold text-gray-700">For:</span>{" "}
            {program.suitable}
          </p>
        </div>

        <div className="flex gap-2">
          <Link
            to={detailPath}
            className="flex-1 text-center border-2 border-[#111184] text-[#111184] font-bold py-2.5 uppercase text-[11px] tracking-wider hover:bg-[#111184] hover:text-white transition-colors"
          >
            Learn More
          </Link>
          <Link
            to="/apply"
            state={{ schoolId: categoryId, program: program.title }}
            className="flex-1 text-center bg-[#dc2626] hover:bg-red-700 text-white font-bold py-2.5 uppercase text-[11px] tracking-wider transition-colors"
          >
            Apply Now
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ──────────── MAIN ──────────── */

export default function Programs() {
  const [activeCategory, setActiveCategory] = useState("digital");
  const activePrograms =
    categories.find((c) => c.id === activeCategory)?.programs || [];

  return (
    <div className="min-h-screen bg-white">
      <Hero />

      <section
        id="programs"
        className="max-w-[1440px] mx-auto w-full px-4 sm:px-12 py-16"
      >
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-1 w-10 bg-[#dc2626]" />
            <span className="text-[#dc2626] text-xs font-bold uppercase tracking-[0.2em]">
              Browse by Category
            </span>
          </div>
          <h2
            className="text-2xl sm:text-3xl font-extrabold text-[#111184] uppercase tracking-tight"
            style={{ fontFamily: "'Tenor Sans', serif" }}
          >
            Find Your Program
          </h2>
        </div>

        {/* Category Tabs — swipeable on mobile */}
        <div className="mb-10 -mx-4 px-4 sm:mx-0 sm:px-0">
          <CategoryTabs
            activeId={activeCategory}
            onSelect={setActiveCategory}
          />
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {activePrograms.map((p) => (
            <ProgramCard
              key={p.title}
              program={p}
              categoryId={activeCategory}
            />
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-[#111184] py-14">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-12 text-center">
          <h2
            className="text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-tight mb-3"
            style={{ fontFamily: "'Tenor Sans', serif" }}
          >
            Ready to Start?
          </h2>
          <p className="text-white/70 text-sm max-w-md mx-auto mb-6">
            Join professionals advancing their careers with LTTC.
          </p>
          <Link
            to="/apply"
            className="inline-block bg-[#dc2626] hover:bg-red-700 text-white font-bold py-4 px-10 uppercase tracking-wider text-sm transition-all shadow-lg hover:shadow-red-500/30"
          >
            Apply Now — Intake Ongoing
          </Link>
        </div>
      </section>
    </div>
  );
}
