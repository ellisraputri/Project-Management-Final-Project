import axios from "axios";
import { getHttp } from "./http";

export async function saveFruitNinja(quiz, username, score){
    try {
        const reqBody = {
            "quizId": quiz._id,
            "quizType": "quiz_fruit_ninja",
            "username": username,
            "score": score,
            "timeTaken": quiz.timeConfig
        };
        const response = await axios.post(
            getHttp() + "/api/record/result",
            reqBody,
        );
        return response.data.success;

    } catch (error) {
        return false;
    }
}

export async function getLeaderboard(quizId) {
    try {
        const response = await axios.get(
            getHttp() + `/api/record/leaderboard?quizId=${quizId}`
        );
        return response.data.records;
    } catch (error) {
        return null;
    }
}