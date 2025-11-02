import React from "react";

function CompleteSentenceCreateQuiz({questions}) {
  return (
    questions.map((q, index) => (
        <div
        key={index}
        className="border border-gray-400 rounded-md p-3 mb-4 bg-white shadow-sm"
        >
        <p
            className="text-[#526E88] mb-3 text-xl"
            style={{ fontFamily: "Nunito" }}
        >
            {index + 1}. {q.question}
        </p>
        <div className="bg-green-200 px-3 py-1 rounded-md w-fit">
            <p className="text-xl" style={{ fontFamily: "Nunito"}}>{q.answer}</p>
        </div>
        </div>
    ))
  );
}

export default CompleteSentenceCreateQuiz;
