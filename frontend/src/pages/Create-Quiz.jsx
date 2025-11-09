import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faUpload } from "@fortawesome/free-solid-svg-icons";
import CompleteSentenceCreateQuiz from '../components/Completesentence-Createquiz';
import FruitNinjaCreateQuiz from '../components/Fruitninja-Createquiz';
import UnjumbleCreateQuiz from '../components/Unjumble-Createquiz';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import templateComplete from '../assets/template_completesentence.png';
import templateFruit from '../assets/template_fruitninja.png';
import templateUnjumble from '../assets/template_unjumble.png';
import { getQuizInfos } from '../service/quiz';

function CreateQuizPage() {
  const { quizID } = useParams();
  const navigate = useNavigate();

  const imageMap = {
    completesentence: templateComplete,
    fruitninja: templateFruit,
    unjumble: templateUnjumble,
  };


  const [title, setTitle] = useState("Title of the quiz");
  const [quizType, setQuizType] = useState("Unjumble");
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchQuizInfo(){
    const resp = await getQuizInfos(quizID);
    if(resp === null){
      toast.error("Quiz not found");
      navigate("/");
      return;
    }
    const quiztype = resp.quizType

    if (quiztype === 'completesentence'){
      let questions = []
      for (let i = 0; i < resp.quiz.questions.length; i++) {
        questions.push({ question: resp.quiz.questions[i], answer: resp.quiz.answers[i] })
      }
      setQuestions(questions)
    }
    else if(quiztype === 'fruitninja'){
      const questions = [
      { instruction: resp.quiz.questionGroup, 
        options: resp.quiz.options, 
        corrects: resp.quiz.corrects
      }]
      setQuestions(questions)
    }
    else if(quiztype === 'unjumble'){
      let questions = []
      for (let i = 0; i < resp.quiz.answers.length; i++) {
        questions.push({ jumbledWords: resp.quiz.jumbledWords[i], answer: resp.quiz.answers[i] })
      }
      setQuestions(questions)
    }

    const quizModels = {
        "fruitninja": "Fruit Ninja",
        "unjumble": "Unjumble",
        "completesentence": "Complete Sentence"
    };
    
    setTitle(resp.quiz.title);
    setQuizType(quizModels[quiztype])
  } 

  useEffect(() => {
    if (!quizID) return;
    setLoading(true);

    (async () => {
      await fetchQuizInfo();
      setLoading(false);
    })();
  }, [quizID]);

  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-[#526E88] text-xl font-semibold" style={{ fontFamily: "Nunito" }}>
          Loading quiz info...
        </p>
      </div>
    );
  }

  return (
    <div className="m-5 mt-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={() => navigate('/')}
            className="rounded-full shadow-lg px-3 py-2 text-lg text-white bg-[#6D94C5] hover:bg-[#4c6e98] transition cursor-pointer"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <p
            className="ml-5 mt-2 text-4xl fw-bolder"
            style={{ color: "#526E88", fontFamily: "Nunito" }}
          >
            <b>{title}</b>
          </p>
        </div>
        
        <button
          className="px-6 py-2 rounded-full bg-[#6D94C5] text-white text-lg font-semibold shadow-md hover:bg-[#4c6e98] transition cursor-pointer"
          style={{ fontFamily: "Nunito" }}
        >
          Publish
        </button>
      </div>

      <div className="flex items-center justify-between">
          <div className="bg-white w-8/10 rounded-2xl shadow-lg p-4 m-5 ml-15 mt-8 min-h-[500px]">
            <p
              className="ml-5 mt-2 text-2xl fw-bolder"
              style={{ color: "#526E88", fontFamily: "Nunito" }}
            >
              <b>List of Questions</b>
            </p>

            <div
              className="overflow-y-auto max-h-[400px] mt-4 ml-4 w-[92%] pr-2"
              style={{ scrollbarWidth: "thin" }}
            >
              {questions.length > 0 ? (
                quizType === "Complete Sentence" ? (
                  <CompleteSentenceCreateQuiz questions={questions} />
                ) : quizType === "Fruit Ninja" ? (
                  <FruitNinjaCreateQuiz questions={questions} />
                ) : quizType === "Unjumble" ? (
                  <UnjumbleCreateQuiz questions={questions} />
                ) : null
              ) : (
                <p className="text-gray-400 italic text-center mt-4" style={{ fontFamily: "Nunito" }}>
                  No questions added yet.
                </p>
              )}
            </div>
          </div>

        <div
          className="rounded-lg shadow-md w-2/10 min-h-[500px] p-8 m-5 mt-8 bg-[#CBDCEB]/60"
          style={{fontFamily: "Nunito" }}
        >
          {/* Upload Section */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-[#526E88] mb-2">
              Upload Questions
            </h3>
            <button className="cursor-pointer flex p-2 items-center w-full border border-gray-300 rounded-md bg-white py-2 hover:bg-gray-50 transition">
              <FontAwesomeIcon icon={faUpload} className="mr-2 text-[#868686]" />
              <span className='text-[#868686] font-semibold'>Upload File</span>
            </button>
            <p className="text-sm text-[#526E88] mt-1 font-normal" style={{fontFamily: "Nunito"}}>
              *Only accept xlsx and csv files
            </p>
          </div>

          {/* Quiz Type */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-[#526E88] mb-2">Quiz Type</h3>
            <select
              value={quizType}
              onChange={(e) => {
                const selectedType = e.target.value;
                setQuizType(selectedType);
                setQuestions([]); 
              }}
              className="w-full border border-gray-300 outline-none rounded-md p-2 bg-white cursor-pointer hover:bg-gray-50 transition"
            >
              <option>Complete Sentence</option>
              <option>Fruit Ninja</option>
              <option>Unjumble</option>
            </select>
            <a
              href="#"
              className="text-[#526E88] text-sm mt-2 inline-block underline hover:text-black"
            >
              Download question template
            </a>
          </div>

          {/* Template Preview */}
          <div>
              <h3 className="text-lg font-bold text-[#526E88] mb-2">
                Template Preview
              </h3>

              <div className="bg-white rounded-md p-2 shadow-sm">
              {(() => {
                const cleanType = quizType.toLowerCase().replace(/\s+/g, "");
                return (
                  <img
                    src={imageMap[cleanType]}
                    alt={`Template for ${quizType}`}
                    className="rounded-md"
                  />
                );
              })()}
            </div>
          </div>
        </div>
      </div>
      

    </div>
  )
}

export default CreateQuizPage