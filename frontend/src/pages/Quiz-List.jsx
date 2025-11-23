import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getTeacherQuizzes, toggleShareQuiz, deleteQuiz } from "../service/teacher";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

function QuizListPage() {
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState([]);

  
  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    const quizzesData = await getTeacherQuizzes();
    
    if (quizzesData) {
      
      const formattedQuizzes = quizzesData.map(quiz => ({
        ...quiz,
        id: quiz._id, 
        date: new Date(quiz.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        })
      }));
      setQuizzes(formattedQuizzes);
    } else {
      toast.error("Failed to load quizzes. Please login first.");
      navigate("/login");
    }
  };

  const handleCreateQuiz = () => {
    navigate("/teacher-createquiz/newquiz");
  };

  const handleShare = async (quizId) => {
    const quiz = quizzes.find(q => q.id === quizId);
    if (!quiz) return;

    const response = await toggleShareQuiz(quiz.id, quiz.quizType);
    
    if (response && response.success) {
      setQuizzes(prevQuizzes => 
        prevQuizzes.map(q => 
          q.id === quizId 
            ? { ...q, isShared: response.isShared, quizCode: response.quizCode }
            : q
        )
      );
      
      alert(response.isShared 
        ? `Quiz shared! Code: ${response.quizCode}` 
        : "Quiz unshared"
      );
    } else {
      toast.error("Failed to update share status");
    }
  };

  const handleEdit = (quizId) => {
   navigate(`/teacher-createquiz/${quizId}`);
  };

  const handleDelete = async (quizId) => {
    const quiz = quizzes.find(q => q.id === quizId);
    if (!quiz) return;

    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${quiz.title}"?`
    );
    
    if (!confirmDelete) return;

    const success = await deleteQuiz(quiz.id, quiz.quizType);
    
    if (success) {
      setQuizzes(prevQuizzes => prevQuizzes.filter(q => q.id !== quizId));
      toast.success("Quiz deleted successfully");
    } else {
      toast.error("Failed to delete quiz");
    }
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
              <div className="flex justify-between items-start mb-2">
                <p className="text-2xl font-bold flex-1">{quiz.title}</p>
                {quiz.isShared && (
                  <span className="bg-green-100 text-green-800 text-xs font-semibold px-2 py-1 rounded">
                    Shared
                  </span>
                )}
              </div>
              <p className="text-lg mb-1">Type : {quiz.type}</p>
              <p className="text-lg mb-1">Date Create : {quiz.date}</p>
              <p className="text-lg">Plays {quiz.plays}</p>
              {quiz.isShared && (
                <p className="text-sm mt-2 bg-blue-50 p-2 rounded">
                  <span className="font-semibold">Code:</span> {quiz.quizCode}
                </p>
              )}
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
                {quiz.isShared ? "Unshare" : "Share"}
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
              <button
                onClick={() => handleDelete(quiz.id)}
                className="btn btn-ghost bg-red-600 hover:bg-red-700 transition cursor-pointer rounded-2xl text-lg px-4"
                style={{
                  color: "white",
                  fontFamily: "Nunito",
                }}
              >
                <FontAwesomeIcon icon={faTrashCan} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuizListPage;