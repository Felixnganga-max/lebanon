import { useState, useRef, useEffect } from "react";
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

/* ──────────── DATA ──────────── */

const categories = [
  {
    id: "digital",
    name: "Digital & Tech",
    programs: [
      {
        title: "Advanced Digital Marketing",
        image: assets.smm,

        duration: "6 Weeks",
        mode: "Online",
        fee: "Ksh. 12,000",
        suitable: "Marketers, Business Owners, Content Creators",
        description:
          "Master SEO, social media strategy, paid advertising, and analytics.",
      },
      {
        title: "Website Development Using WordPress",
        image: assets.wp,

        duration: "4 Weeks",
        mode: "Online",
        fee: "Ksh. 10,000",
        suitable: "Entrepreneurs, Freelancers, Aspiring Developers",
        description:
          "Build professional, responsive websites without writing code.",
      },
      {
        title: "Computer Packages & Digital Literacy",
        image:
          "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
        duration: "1 Month",
        mode: "Online / In-Person",
        fee: "Ksh. 8,000",
        suitable: "Students, Job Seekers, Office Workers",
        description:
          "MS Office, internet skills, and essential computer operations.",
      },
    ],
  },
  {
    id: "data",
    name: "Data & Analytics",
    programs: [
      {
        title: "Data Analysis Using Advanced Excel & Power BI",
        image: assets.ex,
        duration: "12 Weeks",
        mode: "Online",
        fee: "Ksh. 25,000",
        suitable: "Analysts, Accountants, Managers",
        description:
          "Pivot tables, Power Query, DAX, and interactive dashboards.",
      },
      {
        title: "Data Management & Analysis Using Stata",
        image: assets.st,
        duration: "2 Weeks",
        mode: "Online",
        fee: "Ksh. 15,000",
        suitable: "Researchers, Statisticians, M&E Officers",
        description:
          "Statistical analysis, regression modeling, and data visualization.",
      },
      {
        title: "Data Management & Analysis Using R Software",
        image: assets.r,
        duration: "2 Weeks",
        mode: "Online",
        fee: "Ksh. 15,000",
        suitable: "Data Scientists, Researchers, Policy Analysts",
        description:
          "Programming with R for data cleaning and statistical analysis.",
      },
      {
        title: "Statistical Package for Social Sciences (SPSS)",
        image: assets.spss,
        duration: "8 Weeks",
        mode: "Online",
        fee: "Ksh. 20,000",
        suitable: "Social Scientists, Researchers, Students",
        description:
          "Comprehensive SPSS training from data entry to multivariate analysis.",
      },
      {
        title: "Qualitative Data Analysis Using NVivo",
        image:
          "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&q=80",
        duration: "9 Weeks",
        mode: "Online",
        fee: "Ksh. 22,000",
        suitable: "Qualitative Researchers, Academics, Consultants",
        description:
          "Thematic analysis, coding frameworks, and qualitative data management.",
      },
      {
        title: "Qualitative Data Analysis Using QDA Miner Lite",
        image: assets.q,
        duration: "2 Weeks",
        mode: "Online",
        fee: "Ksh. 12,000",
        suitable: "Researchers, Students, NGO Staff",
        description:
          "Code, categorize, and analyze qualitative text data efficiently.",
      },
    ],
  },
  {
    id: "leadership",
    name: "Leadership & Mgmt",
    programs: [
      {
        title: "Leadership & Management",
        image: assets.ld,
        duration: "6 Weeks",
        mode: "Online",
        fee: "Ksh. 10,000",
        suitable: "Managers, Supervisors, Team Leaders, HRs, HoDs",
        description:
          "Strategic leadership, team dynamics, and organizational behavior.",
      },
      {
        title: "Supervisory Skills",
        image: assets.sk,
        duration: "6 Weeks",
        mode: "Online",
        fee: "Ksh. 12,000",
        suitable: "Supervisors, Team Leads, Junior Managers",
        description:
          "Effective supervision, delegation, and conflict resolution.",
      },
      {
        title: "Supervisory Leadership",
        image: assets.sl,

        duration: "6 Weeks",
        mode: "Online",
        fee: "Ksh. 12,000",
        suitable: "Aspiring Leaders, Team Coordinators",
        description: "Leadership principles applied to supervisory roles.",
      },
      {
        title: "Transformational Leadership Development",
        image: assets.tl,
        duration: "6 Weeks",
        mode: "Online",
        fee: "Ksh. 12,000",
        suitable: "Senior Leaders, Executives, Change Agents",
        description:
          "Inspire innovation, drive change, and build high-performance cultures.",
      },
      {
        title: "Strategic Management",
        image:
          "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
        duration: "6 Weeks",
        mode: "Online",
        fee: "Ksh. 15,000",
        suitable: "Executives, Directors, Business Strategists",
        description:
          "Strategic planning, competitive analysis, and long-term positioning.",
      },
      {
        title: "Performance Management",
        image:
          "https://images.unsplash.com/photo-1553028826-f4804a6dba3b?w=800&q=80",
        duration: "4 Weeks",
        mode: "Online",
        fee: "Ksh. 10,000",
        suitable: "HR Professionals, Managers, Team Leaders",
        description:
          "Design and implement effective performance appraisal systems.",
      },
      {
        title: "Project Management",
        image:
          "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=800&q=80",
        duration: "8 Weeks",
        mode: "Online",
        fee: "Ksh. 19,500",
        suitable: "Project Managers, Coordinators, Consultants",
        description:
          "End-to-end project lifecycle management and risk management.",
      },
      {
        title: "Office Administration",
        image:
          "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&q=80",
        duration: "4 Weeks",
        mode: "Online / In-Person",
        fee: "Ksh. 8,000",
        suitable: "Admin Assistants, Office Managers, Secretaries",
        description:
          "Office operations, record management, and administrative excellence.",
      },
      {
        title: "Front Office Management",
        image: assets.fo,
        duration: "1 Month",
        mode: "Online / In-Person",
        fee: "Ksh. 10,000",
        suitable: "Receptionists, Front Desk Officers, Hospitality Staff",
        description:
          "Customer service excellence and professional front-desk operations.",
      },
      {
        title: "Executive Assistant Certificate",
        image:
          "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80",
        duration: "1 Month",
        mode: "Online",
        fee: "Ksh. 10,000",
        suitable: "Executive Assistants, Personal Assistants",
        description:
          "Advanced administrative support and executive communication.",
      },
    ],
  },
  {
    id: "compliance",
    name: "Compliance & Safety",
    programs: [
      {
        title: "Certified Data Protection Officer (DPO)",
        image: assets.cd,
        duration: "4 Weeks",
        mode: "Online",
        fee: "Ksh. 10,000",
        suitable: "DPOs, Compliance Officers, Legal, IT Security",
        description: "GDPR-aligned data protection and compliance auditing.",
      },
      {
        title: "Child Protection & Safeguarding",
        image: assets.cp,
        duration: "6 Weeks",
        mode: "Online",
        fee: "Ksh. 12,000",
        suitable: "Teachers, Social Workers, NGO Staff, Caregivers",
        description:
          "Safeguarding policies, abuse identification, and trauma-informed care.",
      },
      {
        title: "Occupational Safety & Health (OSH)",
        image: assets.os,
        duration: "5 Days",
        mode: "Online / In-Person",
        fee: "Ksh. 8,000",
        suitable: "OSH Officers, Safety Committees, HR Professionals",
        description: "Workplace hazard identification and risk assessment.",
      },
      {
        title: "Disaster Risk Reduction & Management",
        image: assets.p,
        duration: "2 Weeks",
        mode: "Online",
        fee: "Ksh. 10,000",
        suitable: "Emergency Responders, NGO Staff, Government Officers",
        description: "Disaster preparedness and community resilience building.",
      },
      {
        title: "Hospital Emergency Preparedness & Response",
        image: assets.hs,
        duration: "2 Weeks",
        mode: "Online",
        fee: "Ksh. 12,000",
        suitable: "Healthcare Administrators, Emergency Coordinators",
        description:
          "Hospital emergency planning and mass casualty incident management.",
      },
    ],
  },
  {
    id: "ngo",
    name: "NGO & Development",
    programs: [
      {
        title: "Resource Mobilization & Proposal Writing",
        image: assets.rm,
        duration: "6 Weeks",
        mode: "Online",
        fee: "Ksh. 15,000",
        suitable: "Project Managers, Fundraising Officers, NGO Leaders",
        description:
          "Grant writing, donor engagement, and resource mobilization.",
      },
      {
        title: "Project M&E with Data Management",
        image:
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
        duration: "10 Days",
        mode: "Online",
        fee: "Ksh. 12,000",
        suitable: "M&E Officers, Project Managers, Consultants",
        description:
          "M&E frameworks, indicator tracking, and reporting systems.",
      },
      {
        title: "Results-Based Monitoring & Evaluation",
        image:
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
        duration: "5 Days",
        mode: "Online",
        fee: "Ksh. 8,000",
        suitable: "M&E Professionals, Program Managers",
        description:
          "Results-based management and evidence-based decision-making.",
      },
      {
        title: "Participatory Monitoring & Evaluation",
        image: assets.pm,
        duration: "5 Days",
        mode: "Online",
        fee: "Ksh. 8,000",
        suitable: "Community Development Officers, NGO Staff",
        description: "Community-led M&E and participatory tools.",
      },
      {
        title: "Project Performance Evaluation",
        image:
          "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
        duration: "10 Days",
        mode: "Online",
        fee: "Ksh. 12,000",
        suitable: "Evaluators, Program Directors, Donor Representatives",
        description: "Performance metrics and impact assessment methodologies.",
      },
      {
        title: "Impact Evaluation for Evidence-Based Development",
        image:
          "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&q=80",
        duration: "5 Days",
        mode: "Online",
        fee: "Ksh. 10,000",
        suitable: "Researchers, Policy Makers, Development Practitioners",
        description: "Counterfactual analysis and causal impact measurement.",
      },
      {
        title: "Budgeting & Cost Control for NGOs",
        image:
          "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&q=80",
        duration: "5 Days",
        mode: "Online",
        fee: "Ksh. 8,000",
        suitable: "Finance Officers, Program Managers, Grant Administrators",
        description: "NGO budgeting, variance analysis, and donor compliance.",
      },
      {
        title: "Accounting for NGOs Using QuickBooks",
        image:
          "https://images.unsplash.com/photo-1554224154-22dec7ec8818?w=800&q=80",
        duration: "5 Days",
        mode: "Online",
        fee: "Ksh. 8,000",
        suitable: "Accountants, Finance Officers, Admin Staff",
        description:
          "NGO-specific accounting and fund tracking with QuickBooks.",
      },
      {
        title: "Financial Management for Non-Finance Executives",
        image:
          "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
        duration: "2 Weeks",
        mode: "Online",
        fee: "Ksh. 12,000",
        suitable: "Program Directors, Managers, Board Members",
        description: "Financial literacy for leaders: budgets and cash flow.",
      },
      {
        title: "Analytical Decision Making",
        image: assets.dm,
        duration: "5 Days",
        mode: "Online",
        fee: "Ksh. 8,000",
        suitable: "Managers, Analysts, Policy Makers",
        description:
          "Data-driven decision frameworks and strategic problem-solving.",
      },
      {
        title: "Gender Mainstreaming",
        image: assets.gm,
        duration: "5 Days",
        mode: "Online",
        fee: "Ksh. 8,000",
        suitable: "Development Practitioners, HR Professionals, Policy Makers",
        description:
          "Integrating gender perspectives into policies and programs.",
      },
      {
        title: "Gender-Based Violence Training",
        image: assets.gbv,
        duration: "5 Days",
        mode: "Online",
        fee: "Ksh. 8,000",
        suitable: "Social Workers, Counselors, Law Enforcement, NGO Staff",
        description: "GBV prevention, survivor support, and legal frameworks.",
      },
      {
        title: "Disability Mainstreaming in Projects",
        image: assets.ds,
        duration: "5 Days",
        mode: "Online",
        fee: "Ksh. 8,000",
        suitable:
          "Project Managers, HR Professionals, Development Practitioners",
        description: "Inclusive programming and disability rights frameworks.",
      },
    ],
  },
  {
    id: "business",
    name: "Business",
    programs: [
      {
        title: "Entrepreneurship & Business Growth",
        image: assets.bs,
        duration: "6 Weeks",
        mode: "Virtual",
        fee: "Ksh. 15,000",
        suitable: "Entrepreneurs, Business Owners, Startup Founders",
        description: "Business planning, market strategy, and scalable growth.",
      },
      {
        title: "Public Speaking Course",
        image:
          "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80",
        duration: "2 Weeks",
        mode: "Online",
        fee: "Ksh. 12,000",
        suitable: "Professionals, Leaders, Trainers, Politicians",
        description:
          "Persuasive communication and impactful presentation design.",
      },
      {
        title: "Protocol, Etiquette & Event Management",
        image:
          "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80",
        duration: "10 Days",
        mode: "Online / In-Person",
        fee: "Ksh. 12,000",
        suitable: "Event Planners, Protocol Officers, Corporate Professionals",
        description: "Diplomatic protocol and large-scale event coordination.",
      },
      {
        title: "QuickBooks Accounting Software Training",
        image:
          "https://images.unsplash.com/photo-1554224154-22dec7ec8818?w=800&q=80",
        duration: "2 Weeks",
        mode: "Online",
        fee: "Ksh. 10,000",
        suitable: "Accountants, Bookkeepers, Small Business Owners",
        description:
          "Hands-on QuickBooks for invoicing, payroll, and tax compliance.",
      },
      {
        title: "Risk Identification & Quality Risk Management",
        image:
          "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
        duration: "5 Days",
        mode: "Online",
        fee: "Ksh. 8,000",
        suitable: "Quality Managers, Risk Officers, Compliance Professionals",
        description: "ISO-aligned risk frameworks and quality assurance.",
      },
    ],
  },
  {
    id: "specialized",
    name: "Specialized",
    programs: [
      {
        title: "Quantum GIS (QGIS)",
        image:
          "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
        duration: "2 Weeks",
        mode: "Online",
        fee: "Ksh. 12,000",
        suitable: "Urban Planners, Environmental Scientists, Surveyors",
        description: "Spatial data analysis and geospatial visualization.",
      },
      {
        title: "Church Management & Administration",
        image:
          "https://images.unsplash.com/photo-1548625149-fc4a29cf7092?w=800&q=80",
        duration: "1 Month",
        mode: "Online",
        fee: "Ksh. 8,000",
        suitable: "Pastors, Church Administrators, Ministry Leaders",
        description: "Church governance and effective ministry administration.",
      },
      {
        title: "Youth & Children Ministry Leadership",
        image: assets.yt,
        duration: "4 Weeks",
        mode: "Online",
        fee: "Ksh. 8,000",
        dates: "19th Jan – 13th Feb 2026",
        suitable: "Youth Pastors, Sunday School Teachers, Church Volunteers",
        description: "Leadership for youth and children's ministry.",
      },
    ],
  },
];

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
              className="group bg-[#dc2626] hover:bg-red-700 text-white font-bold py-4 px-8 rounded-xl uppercase tracking-wider text-sm flex items-center gap-2 transition-all shadow-lg hover:shadow-red-500/30"
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
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white shadow-md rounded-full flex items-center justify-center text-[#111184] hover:bg-[#111184] hover:text-white transition-colors"
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
              className={`flex-shrink-0 px-5 py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-all duration-200 whitespace-nowrap ${
                isActive
                  ? "bg-[#111184] text-white shadow-lg shadow-[#111184]/20"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-[#111184]"
              }`}
            >
              {cat.name}
              <span
                className={`ml-2 text-[10px] px-1.5 py-0.5 rounded-full ${
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
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white shadow-md rounded-full flex items-center justify-center text-[#111184] hover:bg-[#111184] hover:text-white transition-colors"
        >
          <ChevronRight size={18} />
        </button>
      )}
    </div>
  );
}

function ProgramCard({ program }) {
  const cardRef = useRef(null);

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
      className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
      style={{
        transition:
          "transform 0.25s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s",
      }}
    >
      <div className="h-48 relative overflow-hidden">
        <img
          src={program.image}
          alt={program.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-4 left-4">
          <span className="bg-[#dc2626] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded">
            Intake Ongoing
          </span>
        </div>
      </div>

      <div className="p-5">
        <h4 className="text-[#111184] font-extrabold text-sm uppercase leading-tight mb-3">
          {program.title}
        </h4>

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

        <button className="w-full bg-[#111184] hover:bg-[#0a0a5e] text-white font-bold py-2.5 rounded-lg uppercase text-[11px] tracking-wider transition-colors">
          Apply Now
        </button>
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
            <ProgramCard key={p.title} program={p} />
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
          <button className="bg-[#dc2626] hover:bg-red-700 text-white font-bold py-4 px-10 rounded-xl uppercase tracking-wider text-sm transition-all shadow-lg hover:shadow-red-500/30">
            Apply Now — Intake Ongoing
          </button>
        </div>
      </section>
    </div>
  );
}
