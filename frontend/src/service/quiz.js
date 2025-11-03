import axios from "axios";
import {getHttp} from "./http.js";

export async function getQuestionsFruitNinja(quizCode){
    try {
        axios.defaults.withCredentials = true;
        const response = await axios.get(
            getHttp() + `/api/quiz/fruit-ninja-questions?quizCode=${quizCode}` 
        )
        return response.data.quiz;
    } catch (error) {
        return null;
    }
}

export async function getQuizTypeFromCode(quizCode){
    try {
        axios.defaults.withCredentials = true;
        const response = await axios.get(
            getHttp() + `/api/quiz/quiz-type?quizCode=${quizCode}` 
        )
        return response.data.quizType;
    } catch (error) {
        return null;
    }
}