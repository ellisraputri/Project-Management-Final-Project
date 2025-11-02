import mongoose from "mongoose";
import quizUnjumble from "../models/quiz_unjumble.js"
import connectDB from "../config/db.js";
import dotenv from "dotenv";

dotenv.config();

async function seed() {
  try {
    connectDB();

    const seedData = {
      quizCode: "UNJUMBLE1",
      title: "Unjumble Quiz",
      jumbledWords: [
        ["我", "胡萝卜", "想吃", "。"],
        ["你", "什么", "呢", "在想", "？"],
        ["见面。", "三点半", "约好", "我们", "明天", "广场", "中央", "下午", "在"],
        ["小时。", "两个", "多", "在那里", "他", "蹲了", "已经"]
      ],
      answers: [
        "我想吃胡萝卜。",
        "你在想什么呢？",
        "我们约好明天下午三点半在广场中央见面。",
        "他已经在那里蹲了两个多小时。"
      ],
      creatorId: "6907add74e039fd86be11437",
      totalPlays: 0,
      isShared: true,
      isDeleted: false
    };

    const newQuiz = await quizUnjumble.create(seedData);

    console.log("✅ Seeded successfully:", newQuiz);
    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error seeding:", error);
    mongoose.connection.close();
  }
}

seed();
