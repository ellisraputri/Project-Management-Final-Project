import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Example API route
app.get("/", (req, res) => {
  res.json({ message: "Backend is running 🎉" });
});

// Example API route for frontend
app.get("/api/hello", (req, res) => {
  res.json({ text: "Hello from backend!" });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
