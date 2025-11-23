import React from "react";

function FruitSlicingCreateQuiz({questions}) {
  return (
    <div className="space-y-6">
      {questions.map((item, index) => (
        <div
          key={index}
          className="border border-gray-400 rounded-md p-4 bg-white shadow-sm"
        >
          {/* Question Text */}
          <p
            className="text-[#526E88] mb-4 text-xl"
            style={{ fontFamily: "Nunito" }}
          >
            {item.instruction || item.question}
          </p>

          {/* Word Grid */}
          <div className="grid grid-cols-3 gap-4 justify-items-center">
            {item.options.map((opt, i) => (
              <div
                key={i}
                className={`px-4 py-1 rounded-md text-lg ${
                  item.corrects.includes(opt)
                    ? "bg-green-100 text-[#526E88]"
                    : "text-[#526E88]"
                }`}
                style={{ fontFamily: "Nunito" }}
              >
                {opt}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default FruitSlicingCreateQuiz;
