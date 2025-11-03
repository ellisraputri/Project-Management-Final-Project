import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js"
import authRouter from "./router/auth.js";
import cookieParser from "cookie-parser";
import quizRouter from "./router/quiz.js";
import recordRouter from "./router/record.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors({
  origin: "http://localhost:5173",  // your React app
  credentials: true,                // allow cookies
}));
app.use(cookieParser());
app.use(express.json());
connectDB();

app.get("/", (req, res) => {
  res.json({ message: "Backend is running 🎉" });
});

app.use("/api/auth", authRouter);
app.use("/api/quiz", quizRouter);
app.use("/api/record", recordRouter);

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
