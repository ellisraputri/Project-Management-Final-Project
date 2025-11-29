import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

import authRouter from "./router/auth.js";
import quizRouter from "./router/quiz.js";
import recordRouter from "./router/record.js";
import teacherRouter from "./router/teacher.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Proper ESM dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CORS
app.use(cors({
  origin: ["http://localhost:5173"],
  credentials: true,
}));

app.use(cookieParser());
app.use(express.json());

// DB
connectDB();

app.get("/api", (req, res) => {
  res.json({ message: "Backend is running 🎉" });
});

// API routes
app.use("/api/auth", authRouter);
app.use("/api/quiz", quizRouter);
app.use("/api/record", recordRouter);
app.use("/api/teacher", teacherRouter);

// --- Serve frontend ALWAYS ---
const frontendPath = path.join(__dirname, "../frontend/dist");
app.use(express.static(frontendPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on ${PORT}`);
});