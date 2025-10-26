import React from 'react'
import { useNavigate } from 'react-router-dom'

function NotFoundPage() {
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/");
  }

  return (
    <div className='flex flex-col justify-center min-h-screen'>
        <h1 className='text-center text-6xl font-bold text-[#6D94C5]'>
          #404 Not Found
        </h1>
        <button
            onClick={handleBack}
            className="self-center mt-8 px-8 hover:cursor-pointer py-3 rounded-full bg-[#6D94C5] text-white font-bold text-lg hover:bg-[#4c6e98] transition"
          >
            Go Back
          </button>
    </div>
  )
}

export default NotFoundPage