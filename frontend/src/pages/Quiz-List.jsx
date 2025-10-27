import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function QuizListPage() {
  const navigate = useNavigate();
  
  const [quizzes, setQuizzes] = useState([
    {
      id: 1,
      title: "Chinese Unjumble",
      type: "Unjumble",
      date: "2025-1-23",
      plays: 205,
    },
    {
      id: 2,
      title: "Chinese Ninja",
      type: "Fruit Ninja",
      date: "2025-1-23",
      plays: 23,
    },
    {
      id: 3,
      title: "Complete Sentence",
      type: "Complete Sentence", 
      date: "2025-11-7",
      plays: 56,
    },
  ]);

  const handleBack = () => {
    navigate("/");
  };

  const handleCreateQuiz = () => {
    navigate("/teacher-createquiz");
  };

  const handleShare = (quizId) => {
    alert(`Share quiz ${quizId}`);
  };

  const handleEdit = (quizId) => {
    alert(`Edit quiz ${quizId}`);
  };

  return (
    <div className="m-5 mt-8">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <button
            onClick={handleBack}
            className="rounded-full shadow-lg px-3 py-2 text-lg text-white"
            style={{ backgroundColor: "#6D94C5" }}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <p
            className="ml-5 text-4xl fw-bolder"
            style={{ color: "#526E88", fontFamily: "Nunito" }}
          >
            <b>Your Quizzes</b>
          </p>
        </div>
        <button
          onClick={handleCreateQuiz}
          className="btn btn-ghost rounded-2xl outline-0 text-lg py-2 px-6 hover:outline-none"
          style={{
            backgroundColor: "#6d94c5",
            fontFamily: "Nunito",
            color: "white",
          }}
        >
          Create a New Quiz
        </button>
      </div>

      {/* Quiz Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quizzes.map((quiz) => (
          <div
            key={quiz.id}
            className="bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between min-h-[250px]"
            style={{ fontFamily: "Nunito", color: "#526E88" }}
          >
            <div>
              <p className="text-2xl font-bold mb-2">{quiz.title}</p>
              <p className="text-lg mb-1">Type : {quiz.type}</p>
              <p className="text-lg mb-1">Date Create : {quiz.date}</p>
              <p className="text-lg">Plays {quiz.plays}</p>
            </div>

            <div className="flex gap-4 mt-6">
              <button
                onClick={() => handleShare(quiz.id)}
                className="flex-1 btn btn-ghost rounded-2xl text-lg"
                style={{
                  backgroundColor: "#6D94C5",
                  color: "white",
                  fontFamily: "Nunito",
                }}
              >
                Share
              </button>
              <button
                onClick={() => handleEdit(quiz.id)}
                className="flex-1 btn btn-ghost rounded-2xl text-lg"
                style={{
                  backgroundColor: "#6D94C5",
                  color: "white",
                  fontFamily: "Nunito",
                }}
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuizListPage;