import React, { useState } from "react";
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
    navigate(`/teacher-createquiz/newquiz`);
  };

  const handleShare = (quizId) => {
    alert(`Share quiz ${quizId}`);
  };

  const handleEdit = (quizId) => {
    navigate(`/teacher-createquiz/${quizId}`);
  };

  return (
    <div className="mx-8 my-5 mt-8">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <p
            className="text-4xl fw-bolder"
            style={{ color: "#526E88", fontFamily: "Nunito" }}
          >
            <b>Your Quizzes</b>
          </p>
        </div>
        <button
          onClick={handleCreateQuiz}
          className="btn rounded-2xl bg-[#6D94C5] btn-ghost hover:bg-[#4c6e98] outline-none transition cursor-pointer text-lg py-2 px-6"
          style={{
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
                className="flex-1 btn btn-ghost bg-[#6D94C5] hover:bg-[#4c6e98] transition cursor-pointer rounded-2xl text-lg"
                style={{
                  color: "white",
                  fontFamily: "Nunito",
                }}
              >
                Share
              </button>
              <button
                onClick={() => handleEdit(quiz.id)}
                className="flex-1 btn btn-ghost bg-[#6D94C5] hover:bg-[#4c6e98] transition cursor-pointer rounded-2xl text-lg"
                style={{
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