import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Clock,
  Monitor,
  Wallet,
  Calendar,
  Users,
  CheckCircle2,
  Award,
  Briefcase,
  ArrowRight,
} from "lucide-react";
import { categories } from "../data/programData";
import { slugify } from "../data/slugify";

/* ──────────── NOT FOUND STATE ──────────── */

function ProgramNotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
      <span
        className="text-[#111184] text-6xl font-extrabold mb-4"
        style={{ fontFamily: "'Tenor Sans', serif" }}
      >
        404
      </span>
      <h1 className="text-xl font-extrabold text-[#111184] uppercase tracking-tight mb-3">
        Program Not Found
      </h1>
      <p className="text-gray-500 text-sm max-w-sm mb-8">
        We couldn't find the program you're looking for. It may have been
        renamed or moved to a different category.
      </p>
      <Link
        to="/programs"
        className="inline-flex items-center gap-2 bg-[#111184] hover:bg-[#0a0a5e] text-white font-bold py-3 px-7 uppercase text-xs tracking-wider transition-colors"
      >
        <ArrowLeft size={14} />
        Back to Programs
      </Link>
    </div>
  );
}

/* ──────────── SMALL PIECES ──────────── */

function MetaItem({ icon: Icon, label, value, emphasize }) {
  if (!value) return null;
  return (
    <div className="flex items-start gap-2.5">
      <div className="w-8 h-8 bg-[#111184]/5 flex items-center justify-center flex-shrink-0">
        <Icon size={14} className="text-[#dc2626]" />
      </div>
      <div>
        <div className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">
          {label}
        </div>
        <div
          className={`text-sm font-bold ${
            emphasize ? "text-[#dc2626]" : "text-[#111184]"
          }`}
        >
          {value}
        </div>
      </div>
    </div>
  );
}

function RelatedProgramCard({ program, categoryId }) {
  const detailPath = `/programs/${categoryId}/${slugify(program.title)}`;
  return (
    <Link
      to={detailPath}
      className="group flex-shrink-0 w-64 bg-white overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300"
    >
      <div className="h-32 overflow-hidden">
        <img
          src={program.image}
          alt={program.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
      </div>
      <div className="p-4">
        <h5 className="text-[#111184] font-extrabold text-xs uppercase leading-tight mb-2 group-hover:text-[#dc2626] transition-colors">
          {program.title}
        </h5>
        <div className="flex items-center gap-1.5 text-[11px] text-gray-500">
          <Clock size={11} className="text-[#dc2626]" />
          {program.duration}
        </div>
      </div>
    </Link>
  );
}

/* ──────────── MAIN ──────────── */

export default function ProgramDetail() {
  const { categoryId, slug } = useParams();

  const category = categories.find((c) => c.id === categoryId);
  const program = category?.programs.find((p) => slugify(p.title) === slug);

  // Always land at the top of the page when a program detail is opened —
  // covers both fresh navigation and clicking between related programs
  // while already scrolled down this same page.
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [categoryId, slug]);

  if (!category || !program) {
    return <ProgramNotFound />;
  }

  const relatedPrograms = category.programs.filter(
    (p) => p.title !== program.title,
  );

  // Passed as router state to /apply so the application form can jump
  // straight to the Details step with this school + program pre-selected,
  // instead of restarting the applicant at Step 0 (Choose School).
  const applyPrefill = { schoolId: category.id, program: program.title };

  return (
    <div className="min-h-screen bg-white">
      {/* ── Breadcrumb ── */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-12 pt-8">
        <div className="flex items-center flex-wrap gap-1.5 text-xs text-gray-500 font-medium">
          <Link
            to="/programs"
            className="hover:text-[#dc2626] transition-colors"
          >
            Programs
          </Link>
          <span>/</span>
          <span
            className="hover:text-[#dc2626] transition-colors cursor-default"
            title={category.name}
          >
            {category.name}
          </span>
          <span>/</span>
          <span className="text-[#111184] font-bold">{program.title}</span>
        </div>
      </div>

      {/* ── Header / Hero ── */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-12 pt-8 pb-14">
        <Link
          to="/programs"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#111184] hover:text-[#dc2626] transition-colors mb-8"
        >
          <ArrowLeft size={14} />
          All Programs
        </Link>

        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-14 items-start">
          {/* Editorial overlap image block */}
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-full h-full bg-yellow-400 hidden sm:block" />
            <div className="relative overflow-hidden shadow-xl">
              <img
                src={program.image}
                alt={program.title}
                className="w-full h-72 sm:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111184]/70 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5">
                <span className="bg-[#dc2626] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1.5">
                  Intake Ongoing
                </span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-[2px] w-10 bg-[#dc2626]" />
              <span className="text-[#dc2626] text-xs font-bold uppercase tracking-[0.2em]">
                {category.name}
              </span>
            </div>

            <h1
              className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#111184] leading-tight uppercase tracking-tight mb-5"
              style={{ fontFamily: "'Tenor Sans', serif" }}
            >
              {program.title}
            </h1>

            <p className="text-gray-600 text-sm leading-relaxed mb-8">
              {program.overview || program.description}
            </p>

            <div className="grid grid-cols-2 gap-y-5 gap-x-4 mb-8 p-5 bg-gray-50">
              <MetaItem
                icon={Clock}
                label="Duration"
                value={program.duration}
              />
              <MetaItem icon={Monitor} label="Mode" value={program.mode} />
              <MetaItem
                icon={Wallet}
                label="Fee"
                value={program.fee}
                emphasize
              />
              {program.dates && (
                <MetaItem
                  icon={Calendar}
                  label="Intake Dates"
                  value={program.dates}
                />
              )}
            </div>

            <div className="flex items-start gap-2.5 mb-8">
              <Users
                size={14}
                className="text-[#dc2626] mt-0.5 flex-shrink-0"
              />
              <p className="text-sm text-gray-500 leading-relaxed">
                <span className="font-semibold text-gray-700">
                  Best suited for:
                </span>{" "}
                {program.suitable}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/apply"
                state={applyPrefill}
                className="group inline-flex items-center gap-2 bg-[#dc2626] hover:bg-red-700 text-white font-bold py-4 px-8 uppercase tracking-wider text-sm transition-all shadow-lg hover:shadow-red-500/30"
              >
                Apply Now
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 border-2 border-[#111184] text-[#111184] hover:bg-[#111184] hover:text-white font-bold py-4 px-8 uppercase tracking-wider text-sm transition-colors"
              >
                Ask a Question
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Body: outcomes / curriculum / careers + sidebar ── */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-12 pb-16">
        <div className="grid lg:grid-cols-[1fr_320px] gap-12">
          {/* Main column */}
          <div className="space-y-14">
            {/* Learning outcomes */}
            {program.learningOutcomes?.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-1 w-10 bg-[#dc2626]" />
                  <span className="text-[#dc2626] text-xs font-bold uppercase tracking-[0.2em]">
                    What You'll Be Able to Do
                  </span>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  {program.learningOutcomes.map((outcome, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-4 bg-gray-50"
                    >
                      <CheckCircle2
                        size={16}
                        className="text-[#111184] mt-0.5 flex-shrink-0"
                      />
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {outcome}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Curriculum */}
            {program.curriculum?.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-1 w-10 bg-[#dc2626]" />
                  <span className="text-[#dc2626] text-xs font-bold uppercase tracking-[0.2em]">
                    Curriculum Breakdown
                  </span>
                </div>
                <div className="relative pl-8">
                  <div className="absolute left-[7px] top-1 bottom-1 w-[2px] bg-gray-200" />
                  <div className="space-y-6">
                    {program.curriculum.map((item, i) => (
                      <div key={i} className="relative">
                        <div className="absolute -left-8 top-1 w-4 h-4 bg-[#111184] border-4 border-white shadow" />
                        <p className="text-sm text-gray-700 leading-relaxed">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Career paths */}
            {program.careerPaths?.length > 0 && (
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-1 w-10 bg-[#dc2626]" />
                  <span className="text-[#dc2626] text-xs font-bold uppercase tracking-[0.2em]">
                    Where This Can Take You
                  </span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {program.careerPaths.map((role, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 bg-[#111184] text-white text-xs font-bold uppercase tracking-wider px-4 py-3"
                    >
                      <Briefcase size={13} className="text-yellow-400" />
                      {role}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-8 h-fit space-y-6">
            <div className="bg-[#111184] p-6 text-white">
              <div className="flex items-center gap-2 mb-4">
                <Award size={18} className="text-yellow-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-yellow-400">
                  Certification
                </span>
              </div>
              <p className="text-sm leading-relaxed mb-6 text-white/90">
                {program.certification ||
                  "NITA-Accredited Certificate of Completion"}
              </p>

              <div className="border-t border-white/15 pt-5 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Duration</span>
                  <span className="font-bold">{program.duration}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Mode</span>
                  <span className="font-bold">{program.mode}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Fee</span>
                  <span className="font-bold text-yellow-400">
                    {program.fee}
                  </span>
                </div>
              </div>

              <Link
                to="/apply"
                state={applyPrefill}
                className="mt-6 block text-center bg-[#dc2626] hover:bg-red-700 text-white font-bold py-3.5 uppercase text-xs tracking-wider transition-colors"
              >
                Apply Now
              </Link>
            </div>

            <div className="bg-gray-50 p-6">
              <p className="text-xs text-gray-500 leading-relaxed">
                Have questions about intake dates, payment plans, or whether
                this program fits your goals?{" "}
                <Link
                  to="/contact"
                  className="text-[#dc2626] font-bold hover:underline"
                >
                  Talk to our admissions team
                </Link>
                .
              </p>
            </div>
          </aside>
        </div>
      </section>

      {/* ── Related programs ── */}
      {relatedPrograms.length > 0 && (
        <section className="bg-gray-50 py-14">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-12">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-1 w-10 bg-[#dc2626]" />
              <span className="text-[#dc2626] text-xs font-bold uppercase tracking-[0.2em]">
                More in {category.name}
              </span>
            </div>
            <div className="flex gap-5 overflow-x-auto pb-2 scrollbar-hide">
              {relatedPrograms.map((p) => (
                <RelatedProgramCard
                  key={p.title}
                  program={p}
                  categoryId={category.id}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}