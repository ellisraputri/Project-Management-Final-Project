import express from "express";
import { getQuizFruitNinja, getQuizTypeFromCode, getQuizUnjumble } from "../controller/quiz.js";
import userAuth from "../middleware/auth.js";

const quizRouter = express.Router();

quizRouter.get("/fruit-ninja-questions", getQuizFruitNinja);
quizRouter.get("/unjumble-questions", getQuizUnjumble);
quizRouter.get("/quiz-type", getQuizTypeFromCode);

export default quizRouter;
