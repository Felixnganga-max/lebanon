import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, Search, X, ChevronDown } from "lucide-react";
import { useSplitTextReveal } from "../hooks/useSplitTextReveal";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { useScrollAnimationGroup } from "../hooks/useScrollAnimationGroup";

/* ── SCHOOLS ──
   Each gets a 3-letter catalogue prefix — same logic a real
   college registrar uses for course codes (DGT-01, DAT-04, etc). */
const schools = [
  {
    id: "digital",
    code: "DGT",
    label: "Digital & Technology",
    programs: [
      "Advanced Digital Marketing",
      "Website Development Using WordPress",
      "Computer Packages & Digital Literacy",
    ],
  },
  {
    id: "data",
    code: "DAT",
    label: "Data & Analytics",
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
    code: "LDR",
    label: "Leadership & Management",
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
    code: "CMP",
    label: "Compliance & Safety",
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
    code: "NGO",
    label: "NGO & Development",
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
    code: "BUS",
    label: "Business",
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
    code: "SPC",
    label: "Specialized Studies",
    programs: [
      "Quantum GIS (QGIS)",
      "Church Management & Administration",
      "Youth & Children Ministry Leadership",
    ],
  },
];

// Flatten into a catalogue: every program gets a code like "DGT-01"
const catalogue = schools.flatMap((s) =>
  s.programs.map((p, i) => ({
    code: `${s.code}-${String(i + 1).padStart(2, "0")}`,
    program: p,
    schoolId: s.id,
    schoolLabel: s.label,
  })),
);

const PAGE_SIZE = 6;

export default function CourseSearch() {
  const [query, setQuery] = useState("");
  const [activeSchool, setActiveSchool] = useState(null);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const headingRef = useSplitTextReveal({ delay: 0, staggerMs: 45 });
  const searchBarRef = useScrollAnimation({ delay: 150 });
  const railRef = useScrollAnimation({ delay: 220 });
  const rowsRef = useScrollAnimationGroup({
    staggerMs: 45,
    animVars: { ty: "16px", op: "0", sc: "1" },
  });

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return catalogue
      .filter((c) => !activeSchool || c.schoolId === activeSchool)
      .filter((c) => !q || c.program.toLowerCase().includes(q));
  }, [query, activeSchool]);

  // Reset pagination whenever the filters change
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [query, activeSchool]);

  const visibleResults = results.slice(0, visibleCount);
  const hasMore = visibleCount < results.length;

  const activeLabel = schools.find((s) => s.id === activeSchool)?.label;

  return (
    <section className="w-full bg-[#F7F8FC] py-24 px-4 sm:px-8 overflow-hidden">
      <div className="max-w-[1200px] mx-auto">
        {/* ── Header ── */}
        <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#dc2626] mb-4">
          Course Catalogue · NITA Accredited
        </p>
        <h2
          ref={headingRef}
          className="text-4xl sm:text-5xl text-[#111184] mb-10 tracking-tight leading-[1.05]"
          style={{ fontFamily: "'Tenor Sans', serif", fontWeight: 400 }}
        >
          Find your program
        </h2>

        {/* ── Search ── */}
        <div
          ref={searchBarRef}
          className="relative mb-10 max-w-xl"
          style={{
            "--anim-tx": "0px",
            "--anim-ty": "20px",
            "--anim-op": "0",
            "--anim-sc": "1",
            "--anim-ro": "0deg",
          }}
        >
          <Search
            size={18}
            className="absolute left-5 top-1/2 -translate-y-1/2 text-[#111184]/40"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search the catalogue — e.g. “proposal writing”"
            className="w-full bg-white border border-[#dde3f5] py-4 pl-12 pr-12 text-[15px] text-[#1e2a6e] placeholder:text-[#9aa5d4] outline-none shadow-[0_1px_2px_rgba(17,17,132,0.04)] focus:border-[#111184] focus:ring-4 focus:ring-[#111184]/10 transition"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9aa5d4] hover:text-[#111184] transition"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* ── Catalogue: school rail + ledger ── */}
        <div className="grid lg:grid-cols-[252px_1fr] gap-6 lg:gap-10">
          {/* School rail */}
          <aside
            ref={railRef}
            className="bg-[#111184] p-2.5 flex flex-row lg:flex-col gap-1.5 overflow-x-auto lg:overflow-visible scrollbar-hide lg:sticky lg:top-8 lg:self-start"
            style={{
              "--anim-tx": "-16px",
              "--anim-ty": "0px",
              "--anim-op": "0",
              "--anim-sc": "1",
              "--anim-ro": "0deg",
            }}
          >
            <button
              onClick={() => setActiveSchool(null)}
              className="shrink-0 lg:shrink text-left px-4 py-3 text-sm font-semibold whitespace-nowrap transition-colors"
              style={{
                background: !activeSchool ? "#FACC15" : "transparent",
                color: !activeSchool ? "#111184" : "rgba(255,255,255,0.55)",
              }}
            >
              All Schools
            </button>
            {schools.map((s) => {
              const active = activeSchool === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => setActiveSchool(active ? null : s.id)}
                  className="shrink-0 lg:shrink flex items-center gap-2.5 text-left px-4 py-3 text-sm font-semibold whitespace-nowrap transition-colors"
                  style={{
                    background: active ? "#FACC15" : "transparent",
                    color: active ? "#111184" : "rgba(255,255,255,0.7)",
                  }}
                >
                  <span
                    className="text-[10px] font-bold tracking-wider px-1.5 py-0.5"
                    style={{
                      background: active
                        ? "rgba(17,17,132,0.12)"
                        : "rgba(255,255,255,0.1)",
                      color: active ? "#111184" : "rgba(255,255,255,0.5)",
                    }}
                  >
                    {s.code}
                  </span>
                  {s.label}
                </button>
              );
            })}
          </aside>

          {/* Ledger */}
          <div>
            <div className="flex items-baseline justify-between mb-3 px-1">
              <p className="text-xs font-semibold text-[#6b7bba]">
                {activeLabel || "All schools"} · showing{" "}
                {Math.min(visibleCount, results.length)} of {results.length}{" "}
                {results.length === 1 ? "program" : "programs"}
              </p>
            </div>

            <div
              ref={rowsRef}
              className="bg-white border border-[#e4e7f5] overflow-hidden"
            >
              {results.length === 0 ? (
                <div className="px-6 py-16 text-center">
                  <p className="text-[#111184] font-semibold mb-1">
                    Nothing matches that search
                  </p>
                  <p className="text-sm text-[#9aa5d4]">
                    Try a different keyword or clear the filters.
                  </p>
                </div>
              ) : (
                visibleResults.map((r) => (
                  <Link
                    key={r.code}
                    to="/apply"
                    state={{ schoolId: r.schoolId, program: r.program }}
                    className="group flex items-center justify-between gap-4 px-5 sm:px-6 py-5 border-b border-[#eef0fa] last:border-0 hover:bg-[#f7f8ff] transition-colors"
                  >
                    <div className="flex items-center gap-4 sm:gap-5 min-w-0">
                      <span
                        className="shrink-0 text-[11px] font-bold tracking-wider text-[#111184] bg-[#eef0fa] border border-[#dde3f5] px-2 py-1"
                        style={{ fontFamily: "ui-monospace, monospace" }}
                      >
                        {r.code}
                      </span>
                      <div className="min-w-0">
                        <p className="text-[15px] sm:text-base font-semibold text-[#1e2a6e] truncate group-hover:text-[#111184] transition-colors">
                          {r.program}
                        </p>
                        <p className="text-xs text-[#9aa5d4] mt-0.5 truncate">
                          {r.schoolLabel}
                        </p>
                      </div>
                    </div>
                    <span className="shrink-0 flex items-center gap-1.5 text-sm font-bold text-[#dc2626] opacity-0 group-hover:opacity-100 translate-x-[-6px] group-hover:translate-x-0 transition-all">
                      Apply
                      <ArrowUpRight size={15} />
                    </span>
                  </Link>
                ))
              )}
            </div>

            {hasMore && (
              <div className="flex justify-center mt-6">
                <button
                  onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                  className="group inline-flex items-center gap-2 bg-white border border-[#dde3f5] hover:border-[#111184] text-[#111184] font-semibold text-sm px-7 py-3.5 shadow-[0_1px_2px_rgba(17,17,132,0.04)] hover:shadow-[0_8px_24px_rgba(17,17,132,0.12)] transition-all active:scale-95"
                >
                  Load more programs
                  <span className="text-[#9aa5d4] font-normal">
                    ({results.length - visibleCount} more)
                  </span>
                  <ChevronDown
                    size={16}
                    className="group-hover:translate-y-0.5 transition-transform"
                  />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ── CTA banner ── */}
        <div className="mt-14 bg-[#0b1060] px-8 py-10 sm:px-12 sm:py-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#FACC15]/80 mb-3">
              Don't see your fit?
            </p>
            <h3
              className="text-2xl sm:text-3xl text-white leading-tight"
              style={{ fontFamily: "'Tenor Sans', serif", fontWeight: 400 }}
            >
              Talk to admissions, we'll point you
              <br className="hidden sm:block" /> to the right school.
            </h3>
          </div>
          <Link
            to="/apply"
            className="shrink-0 inline-flex items-center gap-2 bg-[#dc2626] hover:bg-red-700 text-white font-bold px-8 py-4 shadow-lg active:scale-95 transition-all"
          >
            Start Application <ArrowUpRight size={17} />
          </Link>
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; transition: none !important; }
        }
      `}</style>
    </section>
  );
}
