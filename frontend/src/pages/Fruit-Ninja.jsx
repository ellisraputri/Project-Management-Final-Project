import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import FruitNinjaQuestion from "../components/Fruitninja-Question";

function FruitNinjaPage() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(true);
  const [time, setTime] = useState("00:00");

  const [title, setTitle] = useState("Title of the quiz");
  const [questionGroup, setQuestionGroup] = useState("动词");
  const [questions, setQuestions] = useState(
    ["我们", "要", "做", "什么", "是"],
  );
  const [answers, setAnswers] = useState(
    ["要", "做", "是"],
  );

  const [score, setScore] = useState(0);

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

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden position-relative m-5 ml-15 mt-8 min-h-[500px]">
        <div className="p-4">
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
            <b>Slice all circles that is categorized as “{questionGroup}”</b>
          </p>
        </div>
        

        <FruitNinjaQuestion score={score} setScore={setScore} words={questions} answers={answers}/>

      </div>
    </div>
  );
}

export default FruitNinjaPage;
