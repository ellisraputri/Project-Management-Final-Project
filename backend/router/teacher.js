import express from "express";
import { 
    getTeacherQuizzes,
    toggleShareQuiz,
    deleteQuiz
} from "../controller/quiz.js";
import userAuth from "../middleware/auth.js";

const teacherRouter = express.Router();

teacherRouter.get("/quizzes", userAuth, getTeacherQuizzes);
teacherRouter.put("/share", userAuth, toggleShareQuiz);
teacherRouter.delete("/delete", userAuth, deleteQuiz);

export default teacherRouter;