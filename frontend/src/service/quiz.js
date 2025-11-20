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

export async function getQuestionsUnjumble(quizCode){
    try {
        axios.defaults.withCredentials = true;
        const response = await axios.get(
            getHttp() + `/api/quiz/unjumble-questions?quizCode=${quizCode}` 
        )
        return response.data.quiz;
    } catch (error) {
        return null;
    }
}

export async function getQuestionsCompleteSentence(quizCode){
    try {
        axios.defaults.withCredentials = true;
        const response = await axios.get(
            getHttp() + `/api/quiz/complete-sentence-questions?quizCode=${quizCode}` 
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

export async function updateQuizTotalPlays(quiz, quizType){
    try {
        axios.defaults.withCredentials = true;
        const response = await axios.put(
            getHttp() + `/api/quiz/quiz-total-plays?quizId=${quiz._id}&quizType=${quizType}` 
        )
        return response.data.success;
    } catch (error) {
        return null;
    }
}

export async function getQuizInfos(quizId){
    try {
        axios.defaults.withCredentials = true;
        const response = await axios.get(
            getHttp() + `/api/quiz/quiz-infos?quizId=${quizId}` 
        )
        return {
            quiz: response.data.quiz,
            quizType: response.data.quizType
        };
    } catch (error) {
        return null;
    }
}

export async function createNewQuiz(quizType, quizData) {
    try {
        axios.defaults.withCredentials = true;
        const response = await axios.post(
            getHttp() + `/api/quiz/new-quiz?quizType=${quizType}`, quizData
        )
        console.log(response.data)
        return response.data.success;
    } catch (error) {
        return null;
    }
}

export async function editExistingQuiz(quizId, quizType, quizData) {
    try {
        axios.defaults.withCredentials = true;
        const response = await axios.put(
            getHttp() + `/api/quiz/edit-quiz?quizId=${quizId}&quizType=${quizType}`, quizData
        )
        return response.data.success;
    } catch (error) {
        return null;
    }
}