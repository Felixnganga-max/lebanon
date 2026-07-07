import jwt from "jsonwebtoken";
import crypto from "crypto";

const ACCESS_TOKEN_TTL = "15m";
const REFRESH_TOKEN_TTL = "7d";
const REFRESH_TOKEN_TTL_MS = 7 * 24 * 60 * 60 * 1000;

const isProd = process.env.NODE_ENV === "production";

export function signAccessToken({ userId, role, schoolId, tokenVersion }) {
  return jwt.sign(
    { userId, role, schoolId: schoolId ?? null, tokenVersion },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: ACCESS_TOKEN_TTL },
  );
}

export function signRefreshToken({ userId, tokenVersion }) {
  return jwt.sign({ userId, tokenVersion }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: REFRESH_TOKEN_TTL,
  });
}

export function verifyAccessToken(token) {
  return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
}

export function verifyRefreshToken(token) {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
}

export function hashToken(token) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

// Never log a full token — just enough to correlate log lines during an
// incident without turning the log itself into a credential.
export function truncateToken(token) {
  if (!token) return "";
  return `${token.slice(0, 8)}…${token.slice(-4)}`;
}

// SameSite=None is required because the frontend (Hostinger) and backend
// (Vercel) are different origins — SameSite=Strict/Lax would silently drop
// the cookie on every cross-site request. None requires Secure, so both
// only turn on together in production; locally (plain http) we fall back
// to Lax + non-secure so the cookie still works over http://localhost.
export function refreshCookieOptions() {
  return {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "none" : "lax",
    path: "/api/auth",
    maxAge: REFRESH_TOKEN_TTL_MS,
  };
}
