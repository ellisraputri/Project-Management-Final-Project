import mongoose from "mongoose";
import quizFruitNinjaModel from "../models/quiz_fruitninja.js"
import connectDB from "../config/db.js";
import dotenv from "dotenv";

dotenv.config();

async function seed() {
  try {
    connectDB();

    const seedData = {
      quizCode: "FRUIT123",
      title: "Fruit Ninja Quiz",
      questionGroup: "水果",
      timeConfig: "120",
      options: [
        "人", "兰纳罗", "橙子", "苹果", "被子", "草莓", "布", "水", "果汁", "奇异果", "西瓜"
      ],
      corrects: [
        "橙子", "苹果", "草莓", "奇异果", "西瓜"
      ],
      creatorId: "6907add74e039fd86be11437",
      totalPlays: 0,
      isShared: true,
      isDeleted: false
    };

    const newQuiz = await quizFruitNinjaModel.create(seedData);

    console.log("✅ Seeded successfully:", newQuiz);
    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error seeding:", error);
    mongoose.connection.close();
  }
}

seed();
