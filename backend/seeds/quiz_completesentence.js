import mongoose from "mongoose";
import quizCompleteSentenceModel from "../models/quiz_completesentence.js"
import connectDB from "../config/db.js";
import dotenv from "dotenv";

dotenv.config();

async function seed() {
  try {
    connectDB();

    const seedData = {
      quizCode: "COMPLETE123",
      title: "Complete the Sentence Quiz",
      questions: [
        "[____] is the beast associated with the origin of lunar chinese new year",
        "[____] 是中国的首都。",
        "《西游记》中，保护唐僧取经的大徒弟是 [____]。",
        "中国农历新年的最后一天（正月十五）是 [____] 节。",
        "中国古代的“四大发明”包括造纸术、指南针、火药和 [____]。",
      ],
      answers: [
        "年兽",
        "北京",
        "孙悟空",
        "元宵",
        "印刷术"
      ],
      creatorId: "6907add74e039fd86be11437",
      totalPlays: 0,
      isShared: true,
      isDeleted: false
    };

    const newQuiz = await quizCompleteSentenceModel.create(seedData);

    console.log("✅ Seeded successfully:", newQuiz);
    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error seeding:", error);
    mongoose.connection.close();
  }
}

seed();
