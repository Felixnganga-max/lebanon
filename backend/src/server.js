import express from "express";
import cors from "cors";
import "dotenv/config";
import applicationRoutes from "./routes/applicationRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/applications", applicationRoutes); // → POST /api/applications
app.use("/api/contact", contactRoutes); // → POST /api/contact

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
