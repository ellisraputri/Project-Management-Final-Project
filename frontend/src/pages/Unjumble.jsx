import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import UnjumbleQuestion from "../components/Unjumble-Question";
import Leaderboard from "../components/Leaderboard";
import UnjumbleReviewCard from "../components/Unjumble-Review";

function UnjumblePage() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [time, setTime] = useState("00:00");

  const [title, setTitle] = useState("Title of the quiz");
  const [questions, setQuestions] = useState([
    {question: ["我们", "要", "做", "什么", "是"], answer: "我们是要做什么"},
    {question: ["我们", "觉得", "一点", "都不好", "你", "做的"], answer: "我们觉得你做的一点都不好" },
    {question: ["那瓶", "给", "我", "汽水", "是", "喝", "的吗"], answer: "那瓶汽水是给我喝的吗"},
    {question: ["那瓶", "给", "我", "汽水", "是", "喝", "的吗"], answer: "那瓶汽水是给我喝的吗"},
    {question: ["那瓶", "给", "我", "汽水", "是", "喝", "的吗"], answer: "那瓶汽水是给我喝的吗"},
    {question: ["那瓶", "给", "我", "汽水", "是", "喝", "的吗"], answer: "那瓶汽水是给我喝的吗"},
    {question: ["那瓶", "给", "我", "汽水", "是", "喝", "的吗"], answer: "那瓶汽水是给我喝的吗"},
    {question: ["那瓶", "给", "我", "汽水", "是", "喝", "的吗"], answer: "那瓶汽水是给我喝的吗"},
    {question: ["那瓶", "给", "我", "汽水", "是", "喝", "的吗"], answer: "那瓶汽水是给我喝的吗"},
    {question: ["那瓶", "给", "我", "汽水", "是", "喝", "的吗"], answer: "那瓶汽水是给我喝的吗"},
  ]);

  const [leaderboards, setLeaderboards] = useState([
    {"name": "ellis", "score": "00:10"},
    {"name": "ellissssssssssssssssssssssssssssssssssssssssssssssss", "score": "00:10"},
    {"name": "ellis", "score": "00:10"},
    {"name": "ellis", "score": "00:10"},
    {"name": "ellis", "score": "00:10"},
    {"name": "ellis", "score": "00:10"},
    {"name": "ellis", "score": "00:10"},
    {"name": "ellis", "score": "00:10"},
    {"name": "ellis", "score": "00:10"},
    {"name": "ellis", "score": "00:10"},
    {"name": "ellis", "score": "00:10"},
    {"name": "ellis", "score": "00:10"},
    {"name": "ellis", "score": "00:10"},
  ])

  function onSubmit() {
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

  return (
    <div className="m-5 mt-8">
      <div className="flex">
        <button
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

        {running? 
          <UnjumbleQuestion questionsInput={questions} onSubmit={onSubmit}/> 
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
