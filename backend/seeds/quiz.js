import mongoose from "mongoose";
import dotenv from "dotenv";
import userModel from "../models/user.js";     // adjust path
import quizModel from "../models/quiz.js";     // adjust path
import connectDB from "../config/db.js";

dotenv.config();

async function seed() {
  try {
    connectDB();

    let user = await userModel.findOne({ email: "admin1@gmail.com" });

    const quizzes = [
      {
        quizCode: "QUIZ001",
        title: "数学 Quiz",
        type: "complete-sentence",
        questions: [
          "2 + 2 = ?",
          "5 * 3 = ?"
        ],
        answers: [
          "4",
          "15"
        ],
        creatorId: user._id,
        totalPlays: 12,
        isShared: true,
        isDeleted: false
      },
      {
        quizCode: "QUIZ002",
        title: "简单题目",
        type: "fruit-ninja",
        questions: [
          "水果",
        ],
        answers: [
          "苹果",
          "橙子"
        ],
        creatorId: user._id,
        totalPlays: 5,
        isShared: false,
        isDeleted: false
      }
    ];

    await quizModel.insertMany(quizzes);
    console.log("Quiz data seeded");

    process.exit();
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
}

seed();
