import mongoose from "mongoose";
import recordModel from "../models/record.js"; // adjust path to your model
import connectDB from "../config/db.js";
import dotenv from "dotenv";

dotenv.config();

async function seed() {
  try {
    connectDB();

    const quizIds = {
      quiz_complete_sentence: "6907b1fddfb4a2d3974c24e2",
      quiz_unjumble: "6907baaf493b989bb8509f51",
      quiz_fruit_slicing: "6907b5822658afd531efce0e"
    };

    const usernames = [
      "alice","bob","charlie","david","emma","frank","george","harry","irene","jane",
      "kevin","lisa","mark","nina","oliver","paul","queen","ryan","sara","tom",
      "ulysses","vicky","will","xavier","yuri","zoe","adam","bella","carl","dora"
    ];

    const quizTypes = ["quiz_complete_sentence","quiz_unjumble","quiz_fruit_slicing"];
    
    let idx = 0;
    const records = [];

    quizTypes.forEach(type => {
      for (let i = 0; i < 10; i++) {
        records.push({
          quizId: quizIds[type],
          quizType: type,
          username: usernames[idx++],
          score: Math.floor(Math.random() * 100),
          timeTaken: Math.floor(Math.random() * 300) + 30
        });
      }
    });

    const result = await recordModel.insertMany(records);

    console.log(`✅ Inserted ${result.length} records`);
    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    mongoose.connection.close();
  }
}

seed();
