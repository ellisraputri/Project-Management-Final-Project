import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";
import CompleteSentenceQuestion from "../components/CompleteSentence-Question";
import Leaderboard from "../components/Leaderboard";
import CompleteSentenceReviewCard from "../components/CompleteSentence-Review";
import { getQuestionsCompleteSentence, updateQuizTotalPlays } from "../service/quiz";
import { saveQuizResult, getLeaderboard } from "../service/record";

function CompleteSentencePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { quizCode, username, isStart } = location.state || {};

  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [time, setTime] = useState("00:00");

  const [quiz, setQuiz] = useState(null);
  const [title, setTitle] = useState("Complete the Sentence");
  const [questions, setQuestions] = useState([]);
  const [leaderboards, setLeaderboards] = useState([]);

  
  useEffect(() => {
    const fetchQuiz = async () => {
      if (!quizCode || !isStart) {
        alert("No quiz code provided!");
        navigate("/");
        return;
      }

      const quizData = await getQuestionsCompleteSentence(quizCode);
      
      if (quizData) {
        setQuiz(quizData);
        setTitle(quizData.title);
        
        
        const formattedQuestions = quizData.questions.map((q, index) => ({
          question: q,
          answer: quizData.answers[index]
        }));
        setQuestions(formattedQuestions);
        setRunning(true);
      } else {
        alert("Quiz not found!");
        navigate("/");
      }
    };

    fetchQuiz();
  }, [quizCode, navigate]);

  
  const fetchLeaderboardData = async () => {
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
  };

  const formatTime = (totalSeconds) => {
    const min = Math.floor(totalSeconds / 60);
    const sec = totalSeconds % 60;
    return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  };

  async function onSubmit(score) {
    setRunning(false);

    await saveQuizResult(quiz, "quiz_complete_sentence", username, score, seconds);
    
    
    await updateQuizTotalPlays(quiz, "quiz_complete_sentence");
    
    
    await fetchLeaderboardData();
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

  return (
    <div className="m-5 mt-8">
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
              className="text-3xl fw-bolder mt-5 text-center"
              style={{ color: "#526E88", fontFamily: "Nunito" }}
            >
              <b>Complete the sentence below</b>
            </p>
          </div>
        }

        {running ? 
          <CompleteSentenceQuestion questionsInput={questions} onSubmit={onSubmit}/> 
          :
          <div className="flex gap-10 py-1 px-6 mb-8">
            <div className="flex-1">
              <Leaderboard tracks={leaderboards} />
            </div>
            <div className="flex-1">
              <CompleteSentenceReviewCard reviews={questions} />
            </div>
          </div>
        } 
      </div>
    </div>
  );
}

export default CompleteSentencePage;