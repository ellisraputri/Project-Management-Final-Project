import React from "react";

function UnjumbleCreateQuiz({questions}) {
  return (
    <div className="space-y-4">
      {questions.map((q, index) => (
        <div
          key={index}
          className="border border-gray-400 rounded-md p-4 w-full py-6"
          style={{ fontFamily: "Nunito" }}
        >

          <div className="flex items-center gap-3 mb-4">
            <p
              className="text-[#526E88]"
              style={{ fontSize: "18px", minWidth: "2rem" }}
            >
              {index + 1}.
            </p>
            <div className="flex flex-wrap gap-3">
              {q.jumbledWords.map((word, i) => (
                <div
                  key={i}
                  className="bg-[#EDE6D0] text-[#526E88] px-4 py-1 rounded-md"
                  style={{ fontSize: "18px" }}
                >
                  {word}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-green-200 px-4 py-2 rounded-md w-fit ml-12">
            <p style={{ fontSize: "18px" }}>{q.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UnjumbleCreateQuiz;
