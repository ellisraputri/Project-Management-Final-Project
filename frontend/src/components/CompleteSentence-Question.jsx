import React, { useState } from "react";

export default function CompleteSentenceQuestion({ questionsInput, onSubmit }) {
  const [qIndex, setQIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [score, setScore] = useState(0);
  const currentQuestion = questionsInput[qIndex];

  const handleNext = () => {    
    if (qIndex < questionsInput.length - 1) {
      if(userAnswer === currentQuestion.answer) setScore(score+1);
      setQIndex(qIndex + 1);
      setUserAnswer(""); 
    } else {
      onSubmit(score);
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
          className="w-full max-w-lg text-2xl px-6 py-6 rounded-lg border-0 outline-none focus:outline-none"
          style={{
            backgroundColor: "#E8DFCA",
            color: "#000000",
          }}
        />
      </div>

      {/* Next/Submit Button */}
      <div className="flex justify-center mt-12">
        <button
          className="btn btn-ghost rounded-2xl outline-0 text-2xl py-6 px-8 hover:outline-none"
          style={{
            backgroundColor: "#6d94c5",
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