import React, { useState } from "react";

export default function CompleteSentenceQuestion({ questionsInput, onSubmit }) {
  const [qIndex, setQIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const currentQuestion = questionsInput[qIndex];

  const handleNext = () => {
    
    
    if (qIndex < questionsInput.length - 1) {
      setQIndex(qIndex + 1);
      setUserAnswer(""); 
    } else {
      
      onSubmit();
    }
  };

  return (
    <div className="text-center mt-12" style={{ fontFamily: "Nunito" }}>
      {/* Question Text */}
      <p
        className="text-3xl min-h-[100px] px-8"
        style={{ color: "#526E88" }}
      >
        {currentQuestion.question}
      </p>

      {/* Answer Input "Chatbox" */}
      <div className="flex justify-center mt-8">
        <input
          type="text"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder="Type your answer here..."
          className="input input-bordered w-full max-w-lg text-2xl px-6 py-8"
          style={{
            backgroundColor: "#E8DFCA",
            color: "black",
          }}
        />
      </div>

      {/* Next/Submit Button */}
      <div className="flex justify-center mt-12">
        <button
          className="btn btn-ghost rounded-2xl bg-[#6D94C5] hover:bg-[#4c6e98] transition cursor-pointer outline-0 text-2xl py-6 px-8 hover:outline-none"
          style={{
            color: "white",
            fontFamily: "Nunito",
          }}
          onClick={handleNext}
        >
          {qIndex === questionsInput.length - 1 ? "Submit" : "Next"}
        </button>
      </div>
    </div>
  );
}