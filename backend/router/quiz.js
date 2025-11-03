import express from "express";
import { getQuizFruitNinja } from "../controller/quiz.js";
import userAuth from "../middleware/auth.js";

const quizRouter = express.Router();

quizRouter.get("/fruit-ninja-questions", getQuizFruitNinja);

export default quizRouter;
