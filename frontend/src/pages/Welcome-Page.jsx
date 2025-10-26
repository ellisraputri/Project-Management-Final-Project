import React from 'react'
import { useState } from 'react';
import BackgroundLayout from '../components/Background-Layout'

function WelcomePage() {
  const [name, setName] = useState("");
  const [quizCode, setQuizCode] = useState("");

  const handleStart = () => {
    if (!name || !quizCode) {
      alert("Please enter both your name and quiz code!");
      return;
    }
    console.log("Starting quiz:", { name, quizCode });
    // navigate or handle start logic here
  };

  return (
    <BackgroundLayout>
      <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
      {/* Logo + Title */}
      <div className="flex flex-col items-center mb-8">
        <div className='flex items-center gap-3 mb-2'>
          <img
            src="src/assets/logo_black.png" 
            alt="CQGame Pro logo"
            className="w-16 h-12 mb-2"
          />
          <h1 className="text-4xl font-bold text-[#1E1E1E]" style={{ fontFamily: "Nunito" }}>
            CQGame Pro
          </h1>
        </div>
        
        <p className="text-[#526E88] mt-1 text-xl " style={{ fontFamily: "Nunito" }}>
          Gamify your Chinese Learning Experience with{" "}
          <span className="font-bold text-[#6D94C5]">Us!</span>
        </p>
      </div>

      {/* Input Card */}
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-lg mt-4">
        <div className="flex flex-col space-y-6">
          <div className="text-left">
            <label className="block text-[#1E1e1e] font-medium mb-1 text-lg">Enter Your Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-lg bg-[#E6EEF6] focus:outline-none focus:ring-2 focus:ring-[#6D94C5]"
            />
          </div>

          <div className="text-left mt-2 mb-10">
            <label className="block text-[#1E1e1e] font-medium mb-1 text-lg">Enter Quiz Code</label>
            <input
              type="text"
              value={quizCode}
              onChange={(e) => setQuizCode(e.target.value)}
              className="w-full p-3 border border-gray-200 rounded-lg bg-[#E6EEF6] focus:outline-none focus:ring-2 focus:ring-[#6D94C5]"
            />
          </div>

          <button
            onClick={handleStart}
            className="self-center w-1/3 py-3 rounded-full bg-[#6D94C5] text-white font-bold text-lg hover:bg-[#4c6e98] transition"
          >
            START
          </button>
        </div>
      </div>
    </div>

    </BackgroundLayout>
  )
}

export default WelcomePage