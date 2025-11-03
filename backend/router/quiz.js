import express from "express";
import { getQuizFruitNinja, getQuizTypeFromCode } from "../controller/quiz.js";
import userAuth from "../middleware/auth.js";

const quizRouter = express.Router();

quizRouter.get("/fruit-ninja-questions", getQuizFruitNinja);
quizRouter.get("/quiz-type", getQuizTypeFromCode);

export default quizRouter;
