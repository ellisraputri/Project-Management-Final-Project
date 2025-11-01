import React from 'react'
import BackgroundLayout from '../components/Background-Layout'
import { FaGoogle } from 'react-icons/fa'
import { useNavigate } from "react-router-dom";
import { login } from '../service/auth';
import { toast } from 'react-toastify';

function LoginPage() {
  const navigate = useNavigate();

  const loginGoogle = async () => {
    const isSuccess = await login();
    if (isSuccess){
      toast.success("Login success!");
      navigate("/teacher-quizlist");
    }
    else toast.error("Login failed");
  };

  return (
    <BackgroundLayout>
      <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
        <div className="flex flex-col items-center mb-8">
          <div className='flex items-center gap-3 mb-2'>
            <img
              src="src/assets/logo.png" 
              alt="CQGame Pro logo"
              className="w-16 h-12 mb-2"
            />
            <h1 className="text-4xl font-bold text-[#6D94C5]" style={{ fontFamily: "Nunito" }}>
              CQGame Pro
            </h1>
          </div>
          
          <p className="text-[#526E88] mt-1 text-xl" style={{ fontFamily: "Nunito" }}>
            Gamify your Chinese Learning Experience with{" "}
            <span className="font-bold">Us!</span>
          </p>
        </div>
        <button
          style={{fontFamily: "Nunito"}}
          onClick={loginGoogle}
          className="self-center flex text-center px-6 py-3 hover:cursor-pointer rounded-full bg-[#6D94C5] text-white font-semibold text-lg hover:bg-[#4c6e98] transition"
        >
          <FaGoogle className='w-6 h-6 mr-2'/> Login with Google
        </button>
      </div>
    </BackgroundLayout>
  )
}

export default LoginPage
