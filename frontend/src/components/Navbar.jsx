import { useState } from "react";
import { User, Menu, X } from "lucide-react";
import { assets } from "../assets/assets";
import { useFrameColor } from "../context/FrameColorContext";

const navLinks = [
  { label: "Programs", href: "/programs" },
  { label: "Admissions", href: "/apply" },
  { label: "News", href: "/news" },
  { label: "Student Life", href: "/student-life" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { color } = useFrameColor();
  const isLight = color === "transparent" || color.toLowerCase() === "#facc15";
  const navBg = color === "transparent" ? "#ffffff" : color;

  const textColor = isLight ? "#111184" : "#ffffff";
  const linkColor = isLight ? "#3a4680" : "rgba(255,255,255,0.85)";
  const linkHoverColor = isLight ? "#111184" : "#ffffff";
  const iconBg = isLight ? "rgba(17,17,132,0.07)" : "rgba(255,255,255,0.16)";

  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <nav
        style={{
          position: "relative",
          zIndex: 30,
          background: navBg,
          padding: "16px 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: "0 1px 0 rgba(0,0,0,0.06)",
          transition: "background-color 500ms ease",
        }}
      >
        {/* Logo */}
        <a
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            textDecoration: "none",
          }}
        >
          <img
            src={assets.logo}
            alt="Lebanon TTC"
            style={{ height: "32px", width: "32px", objectFit: "contain" }}
          />
          <span
            style={{
              fontFamily: "'Tenor Sans', serif",
              fontWeight: 400,
              fontSize: "0.95rem",
              color: textColor,
              letterSpacing: "0.01em",
              whiteSpace: "nowrap",
              transition: "color 300ms ease",
            }}
          >
            Lebanon TTC
          </span>
        </a>

        {/* Links — desktop */}
        <div
          className="lttc-nav-links"
          style={{ display: "flex", alignItems: "center", gap: "30px" }}
        >
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              style={{
                fontSize: "0.68rem",
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: linkColor,
                textDecoration: "none",
                transition: "color 150ms",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = linkHoverColor)
              }
              onMouseLeave={(e) => (e.currentTarget.style.color = linkColor)}
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Avatar / account icon — desktop only */}
        <button
          className="lttc-nav-avatar"
          aria-label="Account"
          style={{
            width: "38px",
            height: "38px",
            borderRadius: "50%",
            background: iconBg,
            border: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            flexShrink: 0,
            transition: "background-color 300ms ease",
          }}
        >
          <User size={16} color={textColor} strokeWidth={2} />
        </button>

        {/* Apply button — mobile only, replaces the avatar */}
        <a
          href="/apply"
          className="lttc-nav-apply"
          style={{
            display: "none",
            fontSize: "0.66rem",
            fontWeight: 700,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            textDecoration: "none",
            color: isLight
              ? "#ffffff"
              : textColor === "#ffffff"
                ? navBg
                : "#ffffff",
            background: isLight ? "#111184" : "#ffffff",
            padding: "9px 16px",
            borderRadius: "9999px",
            whiteSpace: "nowrap",
            flexShrink: 0,
          }}
        >
          Apply
        </a>

        {/* Mobile hamburger */}
        <button
          className="lttc-nav-burger"
          aria-label="Menu"
          onClick={() => setOpen((o) => !o)}
          style={{
            display: "none",
            width: "38px",
            height: "38px",
            borderRadius: "50%",
            background: iconBg,
            border: "none",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            marginLeft: "8px",
            transition: "background-color 300ms ease",
          }}
        >
          {open ? (
            <X size={16} color={textColor} />
          ) : (
            <Menu size={16} color={textColor} />
          )}
        </button>
      </nav>

      {/* Mobile dropdown */}
      {open && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            background: navBg,
            boxShadow: "0 12px 32px rgba(0,0,0,0.14)",
            padding: "16px 20px",
            display: "flex",
            flexDirection: "column",
            gap: "14px",
          }}
        >
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              style={{
                fontSize: "0.74rem",
                fontWeight: 700,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                color: textColor,
                textDecoration: "none",
              }}
            >
              {l.label}
            </a>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .lttc-nav-links { display: none !important; }
          .lttc-nav-burger { display: flex !important; }
          .lttc-nav-avatar { display: none !important; }
          .lttc-nav-apply { display: inline-flex !important; align-items: center; }
        }
      `}</style>
    </div>
  );
}
