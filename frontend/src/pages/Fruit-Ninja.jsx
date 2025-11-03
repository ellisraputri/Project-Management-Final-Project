import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import FruitNinjaQuestion from "../components/Fruitninja-Question";
import Leaderboard from "../components/Leaderboard";
import FruitNinjaReviewCard from "../components/Fruitninja-Review";
import { getQuestionsFruitNinja, updateQuizTotalPlays } from "../service/quiz";
import { toast } from 'react-toastify';
import { useLocation, useNavigate } from "react-router-dom";
import { getLeaderboard, saveQuizResult } from "../service/record";

function FruitNinjaPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const quizCode = location.state?.quizCode; 
  const username = location.state?.username;
  const [loading, setLoading] = useState(false);

  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(true);
  const [time, setTime] = useState("00:00");
  const [timeConfig, setTimeConfig] = useState(1);

  const [title, setTitle] = useState("");
  const [questionGroup, setQuestionGroup] = useState("");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [quiz, setQuiz] = useState();

  const [score, setScore] = useState(0);
  const [leaderboards, setLeaderboards] = useState([]);

  async function fetchQuestions(){
    const resp = await getQuestionsFruitNinja(quizCode);
    if(resp === null){
      toast.error("Question not found");
      navigate("/");
      return;
    }

    setTitle(resp.title);
    setQuestionGroup(resp.questionGroup);
    setTimeConfig(resp.timeConfig);
    setQuestions(resp.options);
    setAnswers(resp.corrects);
    setRunning(true);
    setQuiz(resp);
  }

  async function onSubmit() {
    setLoading(true);

    const type = "quiz_fruit_ninja";
    const isSuccessSave = await saveQuizResult(quiz, type, username, score, quiz.timeConfig);
    if(!isSuccessSave){
      toast.error("Response cannot be saved. Please try again.");
      return;
    }

    const isSuccessUpdatePlays = await updateQuizTotalPlays(quiz, type);
    if(!isSuccessUpdatePlays){
      toast.error("Response update total play failed. Please try again.");
      return;
    }

    const leaderboardRes = await getLeaderboard(quiz._id);
    if(leaderboardRes === null){
      toast.error("Failed to get leaderboard");
      return;
    }

    setLeaderboards(leaderboardRes);
    setLoading(false);
  }

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [running]);

  useEffect(() => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    setTime(`${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`);

    // If timeConfig is seconds:
    if (seconds >= timeConfig) {
      setRunning(false);
      onSubmit();
    }
  }, [seconds, timeConfig]);

  useEffect(() => {
    if (!quizCode) return;
    setLoading(true);

    (async () => {
      await fetchQuestions();
      setLoading(false);
    })();
  }, [quizCode]);


  return (
    <div className="m-5 mt-8">
      {loading && 
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center mt-15">
          <h1 className="text-xl text-center text-[#6D94C5] font-semibold" style={{fontFamily: "Nunito"}}>Loading...</h1>
          </div>}

      <div className="flex">
        <button
          onClick={() => navigate("/")}
          className="rounded-full shadow-lg px-3 py-2 text-lg text-white bg-[#6D94C5] hover:bg-[#4c6e98] transition cursor-pointer"
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <p
          className="ml-5 mt-2 text-4xl fw-bolder"
          style={{ color: "#526E88", fontFamily: "Nunito" }}
        >
          <b>{title}</b>
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden position-relative m-5 ml-15 mt-8 min-h-[500px]">
        {running && <div className="p-4">
          <div className="flex justify-between">
            <p
              className="text-3xl m-3 fw-bolder"
              style={{ color: "#526E88", fontFamily: "Nunito" }}
            >
              <b>Score: {score}</b>
            </p>

            <p
              className="text-3xl m-3 fw-bolder"
              style={{ color: "#526E88", fontFamily: "Nunito" }}
            >
              <b>{time}</b>
            </p>
          </div>
          
          <p
            className="text-2xl ml-3 fw-bolder mt-1"
            style={{ color: "#526E88", fontFamily: "Nunito" }}
          >
            <b>Slice all circles that is categorized as “{questionGroup}” within {timeConfig} seconds</b>
          </p>
        </div>
        }
        
        {running && !loading ? 
          <FruitNinjaQuestion score={score} setScore={setScore} words={questions} answers={answers}/>
          :
          <div className="flex gap-10 py-5 px-10 mb-5">
            <div className="flex-1">
              <Leaderboard tracks={leaderboards} />
            </div>
            <div className="flex-1">
              <FruitNinjaReviewCard answers={answers} questionGroup={questionGroup} />
            </div>
          </div>
        }

      </div>
    </div>
  );
}

export default FruitNinjaPage;
