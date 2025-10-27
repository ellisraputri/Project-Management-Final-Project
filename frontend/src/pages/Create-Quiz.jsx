import React, { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faUpload } from "@fortawesome/free-solid-svg-icons";
import CompleteSentenceCreateQuiz from '../components/Completesentence-Createquiz';
import FruitNinjaCreateQuiz from '../components/Fruitninja-Createquiz';
import UnjumbleCreateQuiz from '../components/Unjumble-Createquiz';

function CreateQuizPage() {
  const dummyComplete = [
    { question: "聪明的反义词是", answer: "愚钝" },
    { question: "太阳从哪边升起？", answer: "东边" },
    { question: "下雨时需要带什么？", answer: "伞" },
    { question: "下雨时需要带什么？", answer: "伞" },
    { question: "下雨时需要带什么？", answer: "伞" },
    { question: "下雨时需要带什么？", answer: "伞" },
    { question: "下雨时需要带什么？", answer: "伞" },
    { question: "下雨时需要带什么？", answer: "伞" },
  ]
  const dummyFruit = [
    {
      instruction: "Slice all fruits that is categorized as '水果'",
      options: ["自己", "梨子", "苹果", "自己", "梨子", "苹果"],
      correct: ["梨子", "苹果"],
    },
  ]
  const dummyUnjumble = [
    {
      question: "",
      jumbledWords: ["她", "坐", "在那里", "静静地"],
      answer: "她静静地坐在那里。",
    },
    {
      question: "",
      jumbledWords: ["我", "吃", "苹果"],
      answer: "我吃苹果。",
    },
    {
      question: "",
      jumbledWords: ["我", "吃", "苹果"],
      answer: "我吃苹果。",
    },
    {
      question: "",
      jumbledWords: ["我", "吃", "苹果"],
      answer: "我吃苹果。",
    },
    {
      question: "",
      jumbledWords: ["我", "吃", "苹果"],
      answer: "我吃苹果。",
    },
  ]

  const [title, setTitle] = useState("Title of the quiz");
  const [quizType, setQuizType] = useState("Unjumble");
  const [questions, setQuestions] = useState(dummyUnjumble);

  return (
    <div className="m-5 mt-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
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
        
        <button
          className="px-6 py-2 rounded-full text-white text-lg font-semibold shadow-md"
          style={{ backgroundColor: "#6D94C5", fontFamily: "Nunito" }}
        >
          Publish
        </button>
      </div>

      <div className="flex items-center justify-between">
          <div className="bg-white w-8/10 rounded-2xl shadow-lg p-4 m-5 ml-15 mt-8 min-h-[500px]">
            <p
              className="ml-5 mt-2 text-xl fw-bolder"
              style={{ color: "#526E88", fontFamily: "Nunito" }}
            >
              <b>List of Questions</b>
            </p>

            <div
              className="overflow-y-auto max-h-[400px] mt-4 ml-4 w-[92%] pr-2"
              style={{ scrollbarWidth: "thin" }}
            >
              {questions.length > 0 ? (
                quizType === "Complete Sentence" ? (
                  <CompleteSentenceCreateQuiz questions={questions} />
                ) : quizType === "Fruit Ninja" ? (
                  <FruitNinjaCreateQuiz questions={questions} />
                ) : quizType === "Unjumble" ? (
                  <UnjumbleCreateQuiz questions={questions} />
                ) : null
              ) : (
                <p className="text-gray-400 italic text-center mt-4" style={{ fontFamily: "Nunito" }}>
                  No questions added yet.
                </p>
              )}

            </div>
          </div>

        <div
          className="rounded-lg shadow-md w-2/10 min-h-[500px] p-8 m-5 mt-8 bg-[#CBDCEB]/60"
          style={{fontFamily: "Nunito" }}
        >
          {/* Upload Section */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-[#526E88] mb-2">
              Upload Questions
            </h3>
            <button className="flex p-2 items-center w-full border border-gray-300 rounded-md bg-white py-2 hover:bg-gray-50 transition">
              <FontAwesomeIcon icon={faUpload} className="mr-2 text-[#6D94C5]" />
              <span>Upload File</span>
            </button>
            <p className="text-sm text-[#868686] mt-1 font-normal" style={{fontFamily: "Nunito"}}>
              *Only accept xlsx and csv files
            </p>
          </div>

          {/* Quiz Type */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-[#526E88] mb-2">Quiz Type</h3>
            <select
              value={quizType}
              onChange={(e) => {
                const selectedType = e.target.value;
                setQuizType(selectedType);
                setQuestions([]); 
              }}
              className="w-full border border-gray-300 rounded-md p-2 bg-white"
            >
              <option>Complete Sentence</option>
              <option>Fruit Ninja</option>
              <option>Unjumble</option>
            </select>
            <a
              href="#"
              className="text-[#868686] text-sm mt-2 inline-block underline hover:text-black"
            >
              Download question template
            </a>
          </div>

          {/* Template Preview */}
          <div>
              <h3 className="text-lg font-bold text-[#526E88] mb-2">
                Template Preview
              </h3>

              <div className="bg-white rounded-md p-2 shadow-sm">
              {(() => {
                const cleanType = quizType.toLowerCase().replace(/\s+/g, "");
                return (
                  <img
                    src={`src/assets/template_${cleanType}.png`}
                    alt={`Template for ${quizType}`}
                    className="rounded-md"
                  />
                );
              })()}
            </div>
          </div>
        </div>
      </div>
      

    </div>
  )
}

export default CreateQuizPage