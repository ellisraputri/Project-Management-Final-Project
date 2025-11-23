import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import UnjumbleQuestion from "../components/Unjumble-Question";
import Leaderboard from "../components/Leaderboard";
import UnjumbleReviewCard from "../components/Unjumble-Review";
import { getQuestionsUnjumble, updateQuizTotalPlays } from "../service/quiz";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { getLeaderboard, saveQuizResult } from "../service/record";


function UnjumblePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const quizCode = location.state?.quizCode; 
  const username = location.state?.username;
  const [loading, setLoading] = useState(false);

  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [time, setTime] = useState("00:00");

  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([]);
  const [quiz, setQuiz] = useState();

  const [score, setScore] = useState(0);
  const [leaderboards, setLeaderboards] = useState([]);

  async function fetchQuestions(){
    const resp = await getQuestionsUnjumble(quizCode);
    if(resp === null){
      toast.error("Question not found");
      navigate("/");
      return;
    }
    
    const combinedList = resp.jumbledWords.map((words, index) => ({
      question: words,
      answer: resp.answers[index],
    }));
    setQuestions(combinedList)
    
    setTitle(resp.title);
    setRunning(true);
    setQuiz(resp);
  } 

  async function onSubmit() {
    setLoading(true);
    
    const type = "quiz_unjumble";
    const isSuccessSave = await saveQuizResult(quiz, type, username, score, seconds);
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

    const sortedTracks = [...leaderboardRes].sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;         
      return a.timeTaken - b.timeTaken;                          
    });
    setLeaderboards(sortedTracks);
    setLoading(false);
    setRunning(false);
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
    const formatted = `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
    setTime(formatted);
  }, [seconds]);


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
          onClick={() => navigate('/')}
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

      <div className="bg-white rounded-2xl shadow-lg p-4 m-5 ml-15 mt-8 min-h-[500px]">
        {running && 
          <div>
            <p
              className="text-right text-3xl m-5 fw-bolder"
              style={{ color: "#526E88", fontFamily: "Nunito" }}
            >
              <b>{time}</b>
            </p>
            <p
              className="text-3xl fw-bolder mt-5"
              style={{ color: "#526E88", fontFamily: "Nunito" }}
            >
              <b>Unjumble the words below</b>
            </p>
          </div>
        }

        {running && !loading? 
          <UnjumbleQuestion questionsInput={questions} onSubmit={onSubmit} setScore={setScore}/> 
          :
          <div className="flex gap-10 py-1 px-6 mb-8">
            <div className="flex-1">
              <Leaderboard tracks={leaderboards} />
            </div>
            <div className="flex-1">
              <UnjumbleReviewCard reviews={questions} />
            </div>
          </div>
        } 
      </div>
    </div>
  );
}

export default UnjumblePage;
