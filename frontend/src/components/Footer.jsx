import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, ArrowUpRight, ArrowUp } from "lucide-react";

const LOGO =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCl_vWHcUS_AQMfxDjx5veePu9HPYsWJquljb7IJNch0ac4COfFUR2-vBla3mHQsJKnjh8NC1f5N62BCyETY1u_XOTKOD-7hFHqwwwqVf-TwgRfcDYtq4zq98e5Hh8bKOrRweFqwqWerEwTxK2Z2V02U2-VT6kFAakYZcJ2gTEZySwrqsJH-yUHvmkLFfWEgjfrTOGjO4VdD85XLcU6kuCmxTeVb579ISbXu6RBB8SCupnMtvzxYLnMUJdLVO8GR2UgcNF9DJgIA_Wq";

// Mirrors Navbar.jsx exactly — same labels, same order
const quickLinks = [
  { label: "Programs", href: "/programs" },
  { label: "News", href: "/news" },
  { label: "Applications", href: "/applications" },
  { label: "Student Life", href: "/student-life" },
  { label: "Contact", href: "/contact" },
  { label: "About", href: "/about" },
];

// Mirrors the school catalogue used in CourseSearch.jsx / Faculty.jsx
const schools = [
  { id: "digital", label: "Digital & Technology" },
  { id: "data", label: "Data & Analytics" },
  { id: "leadership", label: "Leadership & Management" },
  { id: "compliance", label: "Compliance & Safety" },
  { id: "ngo", label: "NGO & Development" },
  { id: "business", label: "Business" },
  { id: "specialized", label: "Specialized Studies" },
];

const socials = [
  {
    name: "Facebook",
    href: "#",
    path: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",
  },
  {
    name: "Twitter / X",
    href: "#",
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L2.25 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
  {
    name: "LinkedIn",
    href: "#",
    paths: [
      "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z",
    ],
    circle: { cx: 4, cy: 4, r: 2 },
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/254105221148",
    path: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z",
  },
];

function SocialIcon({ s }) {
  return (
    <a
      href={s.href}
      target={s.href.startsWith("http") ? "_blank" : undefined}
      rel={s.href.startsWith("http") ? "noreferrer" : undefined}
      aria-label={s.name}
      className="flex items-center justify-center w-9 h-9 rounded-full border border-[#111184]/15 text-[#111184]/60 hover:bg-[#FACC15] hover:border-[#FACC15] hover:text-[#0b1060] transition-colors"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        {s.circle && (
          <circle cx={s.circle.cx} cy={s.circle.cy} r={s.circle.r} />
        )}
        {s.paths ? (
          s.paths.map((d, i) => <path key={i} d={d} />)
        ) : (
          <path d={s.path} />
        )}
      </svg>
    </a>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-white">
      {/* ── CTA strip ── */}
      <div className="bg-[#0b1060] px-4 sm:px-8">
        <div className="max-w-[1440px] mx-auto py-10 sm:py-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p
              className="text-[#FACC15]/80 text-[11px] font-bold tracking-[0.2em] uppercase mb-2"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              NITA Accredited · Online via Google Meet
            </p>
            <h2
              className="text-white text-2xl sm:text-3xl leading-snug"
              style={{ fontFamily: "'Tenor Sans', serif", fontWeight: 400 }}
            >
              Ready to get certified?
            </h2>
          </div>
          <Link
            to="/applications"
            className="shrink-0 inline-flex items-center gap-2 bg-[#dc2626] hover:bg-red-700 text-white font-bold px-8 py-4 rounded-xl shadow-lg active:scale-95 transition-all"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Start Application <ArrowUpRight size={17} />
          </Link>
        </div>
      </div>

      {/* ── Main footer ── */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          {/* Brand column */}
          <div className="md:col-span-4">
            <Link to="/" className="flex items-center gap-3 mb-5">
              <img
                src={LOGO}
                alt="Lebanon TTC"
                className="h-10 w-10 object-contain"
              />
              <div className="leading-tight">
                <span
                  className="block text-[#0b1060] text-base uppercase tracking-wide"
                  style={{ fontFamily: "'Tenor Sans', serif" }}
                >
                  Lebanon TTC
                </span>
                <span
                  className="block text-[10px] font-bold tracking-[0.14em] uppercase text-[#6b7bba] mt-0.5"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  Training · Certifying · Transforming
                </span>
              </div>
            </Link>
            <p
              className="text-sm text-[#374151]/70 leading-relaxed max-w-xs mb-6"
              style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 300 }}
            >
              A NITA-accredited technical training college offering
              professional, skills-based certificate courses across seven
              schools — built for people who want to get hired, not just
              educated.
            </p>
            <div className="flex items-center gap-2.5">
              {socials.map((s) => (
                <SocialIcon key={s.name} s={s} />
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div className="md:col-span-2">
            <p
              className="text-[11px] font-bold tracking-[0.16em] uppercase text-[#9aa5d4] mb-5"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Quick Links
            </p>
            <ul className="space-y-3">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    to={l.href}
                    className="text-sm text-[#374151] hover:text-[#0b1060] transition-colors"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our schools */}
          <div className="md:col-span-3">
            <p
              className="text-[11px] font-bold tracking-[0.16em] uppercase text-[#9aa5d4] mb-5"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Our Schools
            </p>
            <ul className="space-y-3">
              {schools.map((s) => (
                <li key={s.id}>
                  <Link
                    to="/applications"
                    state={{ schoolId: s.id }}
                    className="text-sm text-[#374151] hover:text-[#0b1060] transition-colors"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <p
              className="text-[11px] font-bold tracking-[0.16em] uppercase text-[#9aa5d4] mb-5"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              Get in Touch
            </p>
            <ul
              className="space-y-4"
              style={{ fontFamily: "'Poppins', sans-serif" }}
            >
              <li>
                <a
                  href="tel:+254105221148"
                  className="flex items-start gap-3 text-sm text-[#374151] hover:text-[#0b1060] transition-colors"
                >
                  <Phone size={15} className="text-[#FACC15] mt-0.5 shrink-0" />
                  +254 105 221 148
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@lebanonttc.co.ke"
                  className="flex items-start gap-3 text-sm text-[#374151] hover:text-[#0b1060] transition-colors"
                >
                  <Mail size={15} className="text-[#FACC15] mt-0.5 shrink-0" />
                  info@lebanonttc.co.ke
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-[#374151]">
                <MapPin size={15} className="text-[#FACC15] mt-0.5 shrink-0" />
                Embu, Kenya
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="border-t border-[#e5e7eb]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p
            className="text-xs text-[#9aa5d4] text-center sm:text-left"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            © {year} Lebanon Technical Training College. All rights reserved.
          </p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#0b1060] hover:text-[#dc2626] transition-colors"
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Back to top <ArrowUp size={13} />
          </button>
        </div>
      </div>
    </footer>
  );
}
