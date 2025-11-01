import dotenv from "dotenv";
import userModel from "../models/user.js";    
import quizModel from "../models/quiz.js";    
import recordModel from "../models/record.js"; 
import connectDB from "../config/db.js";

dotenv.config();

async function seedRecords() {
  try {
    connectDB();

    let user = await userModel.findOne({email: "user1@gmail.com"});
    let quiz = await quizModel.findOne({quizCode: "QUIZ001"});

    const records = [
      {
        quizId: quiz._id,
        userId: user._id,
        score: 90,
        timeTaken: 30
      },
      {
        quizId: quiz._id,
        userId: user._id,
        score: 75,
        timeTaken: 42
      },
      {
        quizId: quiz._id,
        userId: user._id,
        score: 100,
        timeTaken: 25
      }
    ];

    await recordModel.insertMany(records);
    console.log("Records seeded successfully");

    process.exit();
  } catch (error) {
    console.error("Error seeding records:", error);
    process.exit(1);
  }
}

seedRecords();
