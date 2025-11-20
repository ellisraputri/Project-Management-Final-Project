import axios from "axios";
import { getHttp } from "./http";

export async function getTeacherQuizzes() {
    try {
        axios.defaults.withCredentials = true;
        const response = await axios.get(
            getHttp() + "/api/teacher/quizzes"  
        );
        return response.data.quizzes;
    } catch (error) {
        console.error("Error fetching teacher quizzes:", error);
        return null;
    }
}

export async function toggleShareQuiz(quizId, quizType) {
    try {
        axios.defaults.withCredentials = true;
        const response = await axios.put(
            getHttp() + "/api/teacher/share",  
            { quizId, quizType }
        );
        return response.data;
    } catch (error) {
        console.error("Error toggling share:", error);
        return null;
    }
}

export async function deleteQuiz(quizId, quizType) {
    try {
        axios.defaults.withCredentials = true;
        const response = await axios.delete(
            getHttp() + `/api/teacher/delete?quizId=${quizId}&quizType=${quizType}`  
        );
        return response.data.success;
    } catch (error) {
        console.error("Error deleting quiz:", error);
        return false;
    }
}