import express from "express";
import { getQuizFromId, getQuizFruitNinja, getQuizTypeFromCode, getQuizUnjumble, updateQuizTotalPlays } from "../controller/quiz.js";
import userAuth from "../middleware/auth.js";

const quizRouter = express.Router();

quizRouter.get("/fruit-ninja-questions", getQuizFruitNinja);
quizRouter.get("/unjumble-questions", getQuizUnjumble);
quizRouter.get("/quiz-type", getQuizTypeFromCode);
quizRouter.put("/quiz-total-plays", updateQuizTotalPlays);

quizRouter.get("/quiz-infos", userAuth, getQuizFromId)

export default quizRouter;
