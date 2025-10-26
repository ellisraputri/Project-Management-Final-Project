import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import CompleteSentenceQuestion from "../components/CompleteSentence-Question";
import Leaderboard from "../components/Leaderboard";
import CompleteSentenceReviewCard from "../components/CompleteSentence-Review";

function CompleteSentencePage() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(true);
  const [time, setTime] = useState("00:00");

  const [title, setTitle] = useState("Complete the Sentence");
  const [questions, setQuestions] = useState([
    {
      question: "[____] is the beast associated with the origin of lunar chinese new year",
      answer: "年兽"
    },
    {
      question: "[____] 是中国的首都。",
      answer: "北京"
    },
    {
      question: "《西游记》中，保护唐僧取经的大徒弟是 [____]。",
      answer: "孙悟空"
    },
    {
      question: "中国农历新年的最后一天（正月十五）是 [____] 节。",
      answer: "元宵"
    },
    {
      question: "中国古代的“四大发明”包括造纸术、指南针、火药和 [____]。",
      answer: "印刷术"
    }
  ]);

  const [leaderboards, setLeaderboards] = useState([
    {"name": "Ellis", "score": "00:45"},
    {"name": "Eastvara", "score": "01:02"},
    {"name": "Cia", "score": "01:15"},
    {"name": "Mikel", "score": "01:23"},
    {"name": "Annabel", "score": "01:34"},
    {"name": "Davideus", "score": "01:45"},
    {"name": "Emmanuel", "score": "01:52"},
    {"name": "Christopher", "score": "02:05"},
    {"name": "Lisara", "score": "02:18"},
    {"name": "Kirara", "score": "02:30"}
  ]);

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
          className="rounded-full shadow-lg px-3 py-2 text-lg text-white"
          style={{ backgroundColor: "#6D94C5" }}
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
          <div className="flex gap-4">
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