import dotenv from "dotenv";
import userModel from "../models/user.js";
import connectDB from "../config/db.js";

dotenv.config();

const users = [
  { name: "User 1", email: "user1@gmail.com", isDeleted: false },
  { name: "User 2", email: "user2@gmail.com", isDeleted: false },
  { name: "User 3", email: "user3@gmail.com", isDeleted: false },
  { name: "User 4", email: "user4@gmail.com", isDeleted: false },
  { name: "User 5", email: "user5@gmail.com", isDeleted: false },
  { name: "Admin 1", email: "admin1@gmail.com", isDeleted: false },
  { name: "Admin 2", email: "admin2@gmail.com", isDeleted: false },
  { name: "Admin 3", email: "admin3@gmail.com", isDeleted: false },
  { name: "Admin 4", email: "admin4@gmail.com", isDeleted: false },
  { name: "Admin 5", email: "admin5@gmail.com", isDeleted: false },
];

async function seed() {
  try {
    await connectDB();
    console.log(process.env.MONGODB_URI)

    await userModel.insertMany(users);
    console.log("Users seeded successfully");

    process.exit();
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  }
}

seed();
