import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import "dotenv/config";
import connectDB from "./config/db.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import authRoutes from "./routes/auth.routes.js";
import certificateRoutes from "./routes/certificate.routes.js";
import documentRoutes from "./routes/document.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import programRoutes from "./routes/program.routes.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

// Vercel puts the app behind a proxy — without this, req.ip and the
// rate limiter both see the proxy's IP instead of the real client's.
app.set("trust proxy", 1);

app.use(helmet());

// The refresh-token cookie is httpOnly + credentialed, which the `cors`
// package will only send back for an explicit origin — "*" is rejected
// outright when credentials:true. Origins are configured via env since the
// frontend (Hostinger) and backend (Vercel) are different domains/deploys.
const stripTrailingSlash = (url) => url.replace(/\/+$/, "");

const allowedOrigins = (
  process.env.ALLOWED_ORIGINS ||
  "http://localhost:5173,http://localhost:5174,https://lebanonttc.co.ke,https://www.lebanonttc.co.ke"
)
  .split(",")
  .map((origin) => stripTrailingSlash(origin.trim()))
  .filter(Boolean);

console.log("[cors] allowed origins:", allowedOrigins);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(stripTrailingSlash(origin))) {
        return callback(null, true);
      }
      // Logged so a rejected origin (typo, trailing slash, stale env var)
      // is visible in Vercel's Runtime Logs instead of a silent CORS 500.
      console.warn(
        `[cors] rejected origin "${origin}" — allowed: ${allowedOrigins.join(", ")}`,
      );
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  }),
);

app.use(cookieParser());
app.use(express.json());

app.use("/api/applications", applicationRoutes); // → POST /api/applications
app.use("/api/contact", contactRoutes); // → POST /api/contact
app.use("/api/auth", authRoutes); // → POST /api/auth/admin/login, GET /api/auth/admin/me
app.use("/api/certificates", certificateRoutes); // → verify (public) + admin CRUD
app.use("/api/documents", documentRoutes); // → public list + admin upload/delete
app.use("/api/categories", categoryRoutes); // → public list + admin CRUD
app.use("/api/programs", programRoutes); // → public list/detail + admin CRUD/reorder

app.use(errorHandler);

// Vercel's Node runtime imports this module and calls the default export
// as the request handler on every invocation — it does NOT run app.listen().
// Locally (node src/server.js / nodemon) there's no such caller, so we start
// a real server for that case only. Connect to Mongo eagerly either way;
// serverless functions are cold-started per invocation so the connection
// needs to be (re)established outside the listen() branch.
connectDB();

if (process.env.VERCEL !== "1") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

export default app;
