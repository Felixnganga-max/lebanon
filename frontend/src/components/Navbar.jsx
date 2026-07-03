import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { assets } from "../assets/assets";

const navLinks = [
  { label: "Programs", href: "/programs" },
  { label: "News", href: "/news" },
  { label: "Applications", href: "/applications" },
  { label: "Student Life", href: "/student-life" },
  { label: "Contact", href: "/contact" },
  { label: "About", href: "/about" },
];

const LOGO =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCl_vWHcUS_AQMfxDjx5veePu9HPYsWJquljb7IJNch0ac4COfFUR2-vBla3mHQsJKnjh8NC1f5N62BCyETY1u_XOTKOD-7hFHqwwwqVf-TwgRfcDYtq4zq98e5Hh8bKOrRweFqwqWerEwTxK2Z2V02U2-VT6kFAakYZcJ2gTEZySwrqsJH-yUHvmkLFfWEgjfrTOGjO4VdD85XLcU6kuCmxTeVb579ISbXu6RBB8SCupnMtvzxYLnMUJdLVO8GR2UgcNF9DJgIA_Wq";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Tenor+Sans&display=swap');

  .nb-topbar {
    width: 100%;
    background: #0b1060;
    padding: 0 48px;
    height: 38px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-family: 'Inter', sans-serif;
  }
  .nb-topbar-left {
    display: flex;
    align-items: center;
    gap: 28px;
  }
  .nb-topbar-item {
    display: flex;
    align-items: center;
    gap: 7px;
    font-size: 0.72rem;
    color: rgba(255,255,255,0.7);
    text-decoration: none;
    transition: color 160ms;
  }
  .nb-topbar-item:hover { color: #FACC15; }
  .nb-topbar-item svg { flex-shrink: 0; }
  .nb-topbar-right {
    display: flex;
    align-items: center;
    gap: 14px;
  }
  .nb-social {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 26px; height: 26px;
    border-radius: 50%;
    border: 1px solid rgba(255,255,255,0.18);
    color: rgba(255,255,255,0.6);
    cursor: pointer;
    transition: background 160ms, color 160ms, border-color 160ms;
  }
  .nb-social:hover {
    background: #FACC15;
    border-color: #FACC15;
    color: #0b1060;
  }

  /* ── MAIN NAV ── */
  .nb-main {
    width: 100%;
    background: white;
    border-bottom: 1px solid #e5e7eb;
    padding: 0 48px;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-family: 'Inter', sans-serif;
    position: relative;
  }

  .nb-logo {
    display: flex;
    align-items: center;
    gap: 10px;
    text-decoration: none;
    flex-shrink: 0;
  }
  .nb-logo img { height: 48px; width: 48px; object-fit: contain; }
  .nb-logo-text { line-height: 1; }
  .nb-logo-name {
    display: block;
    font-family: 'Tenor Sans', serif;
    font-size: 1rem;
    font-weight: 400;
    color: #0b1060;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }
  .nb-logo-sub {
    display: block;
    font-size: 0.58rem;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #6b7bba;
    margin-top: 2px;
  }

  .nb-links {
    display: flex;
    align-items: center;
    gap: 4px;
    list-style: none;
    margin: 0; padding: 0;
  }
  .nb-link {
    position: relative;
  }
  .nb-link a {
    display: block;
    padding: 8px 14px;
    font-size: 0.78rem;
    font-weight: 600;
    color: #374151;
    text-decoration: none;
    letter-spacing: 0.02em;
    border-radius: 6px;
    transition: color 160ms, background 160ms;
    white-space: nowrap;
  }
  .nb-link a:hover { color: #0b1060; background: #f3f4f6; }
  .nb-link a.active {
    color: #0b1060;
    font-weight: 700;
  }
  .nb-link a.active::after {
    content: '';
    position: absolute;
    bottom: -17px;
    left: 14px; right: 14px;
    height: 2.5px;
    background: #FACC15;
    border-radius: 99px;
  }

  .nb-apply {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    background: #0b1060;
    color: #fff;
    padding: 10px 22px;
    border-radius: 6px;
    font-size: 0.76rem;
    font-weight: 700;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    text-decoration: none;
    transition: background 180ms, transform 180ms;
    flex-shrink: 0;
    white-space: nowrap;
  }
  .nb-apply:hover {
    background: #070c4a;
    transform: translateY(-1px);
  }
  .nb-apply-dot {
    width: 7px; height: 7px;
    border-radius: 50%;
    background: #FACC15;
    flex-shrink: 0;
  }

  /* ── MOBILE ── */
  .nb-hamburger {
    display: none;
    background: none;
    border: none;
    cursor: pointer;
    color: #0b1060;
    padding: 4px;
  }
  .nb-mobile-menu {
    position: fixed;
    top: 102px; left: 0; right: 0;
    background: #0b1060;
    z-index: 998;
    padding: 8px 0 20px;
    box-shadow: 0 8px 32px rgba(11,16,96,0.25);
  }
  .nb-mobile-link {
    display: block;
    padding: 13px 28px;
    font-size: 0.85rem;
    font-weight: 600;
    color: rgba(255,255,255,0.85);
    text-decoration: none;
    border-bottom: 1px solid rgba(255,255,255,0.07);
    letter-spacing: 0.03em;
    transition: color 150ms, background 150ms;
  }
  .nb-mobile-link:hover { color: #FACC15; background: rgba(255,255,255,0.05); }
  .nb-mobile-apply {
    display: block;
    margin: 14px 28px 0;
    background: #FACC15;
    color: #0b1060;
    padding: 12px 22px;
    border-radius: 6px;
    font-size: 0.78rem;
    font-weight: 700;
    text-align: center;
    text-decoration: none;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  @media (max-width: 900px) {
    .nb-topbar { padding: 0 20px; }
    .nb-topbar-left .nb-topbar-item:last-child { display: none; }
    .nb-main { padding: 0 20px; }
    .nb-links { display: none; }
    .nb-apply { display: none; }
    .nb-hamburger { display: flex; }
  }
`;

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => setMobileOpen(false), [location]);

  const isActive = (href) => location.pathname === href;

  return (
    <>
      <style>{CSS}</style>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 999,
        }}
      >
        {/* ── TOP BAR ── */}
        <div className="nb-topbar">
          <div className="nb-topbar-left">
            <a href="tel:+254105221148" className="nb-topbar-item">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6.29 6.29l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              +254 105 221 148
            </a>
            <a href="mailto:info@lebanonttc.co.ke" className="nb-topbar-item">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              info@lebanonttc.co.ke
            </a>
          </div>
          <div className="nb-topbar-right">
            {/* Facebook */}
            <div className="nb-social">
              <svg
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </div>
            {/* Twitter/X */}
            <div className="nb-social">
              <svg
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L2.25 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </div>
            {/* LinkedIn */}
            <div className="nb-social">
              <svg
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </div>
            {/* WhatsApp */}
            <div className="nb-social">
              <svg
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
              </svg>
            </div>
          </div>
        </div>

        {/* ── MAIN NAV ── */}
        <div className="nb-main">
          <Link to="/" className="nb-logo">
            <img src={assets.logo} alt="Lebanon TTC" />
            <div className="nb-logo-text">
              <span className="nb-logo-name">Lebanon TTC</span>
            </div>
          </Link>

          <ul className="nb-links">
            {navLinks.map((link) => (
              <li key={link.href} className="nb-link">
                <Link
                  to={link.href}
                  className={isActive(link.href) ? "active" : ""}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <Link to="/applications" className="nb-apply">
            <span className="nb-apply-dot" />
            Apply Now
          </Link>

          {/* Mobile hamburger */}
          <button
            className="nb-hamburger"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* ── MOBILE MENU ── */}
        {mobileOpen && (
          <div className="nb-mobile-menu">
            {navLinks.map((link) => (
              <Link key={link.href} to={link.href} className="nb-mobile-link">
                {link.label}
              </Link>
            ))}
            <Link to="/applications" className="nb-mobile-apply">
              Apply Now
            </Link>
          </div>
        )}
      </header>

      {/* Spacer so page content clears the fixed navbar (38px topbar + 64px main) */}
      <div style={{ height: 102 }} />
    </>
  );
}
