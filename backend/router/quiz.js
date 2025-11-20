import express from "express";
import { createNewQuiz, editExistingQuiz, getQuizFromId, getQuizFruitNinja, getQuizCompleteSentence, getQuizTypeFromCode, getQuizUnjumble, updateQuizTotalPlays } from "../controller/quiz.js";
import userAuth from "../middleware/auth.js";

const quizRouter = express.Router();

quizRouter.get("/fruit-ninja-questions", getQuizFruitNinja);
quizRouter.get("/unjumble-questions", getQuizUnjumble);
quizRouter.get("/complete-sentence-questions", getQuizCompleteSentence);  
quizRouter.get("/quiz-type", getQuizTypeFromCode);
quizRouter.put("/quiz-total-plays", updateQuizTotalPlays);

quizRouter.get("/quiz-infos", userAuth, getQuizFromId)
quizRouter.post("/new-quiz", userAuth, createNewQuiz)
quizRouter.put("/edit-quiz", userAuth, editExistingQuiz)

export default quizRouter;
