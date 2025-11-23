import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faUpload } from "@fortawesome/free-solid-svg-icons";
import CompleteSentenceCreateQuiz from '../components/Completesentence-Createquiz';
import FruitSlicingCreateQuiz from '../components/Fruitslicing-Createquiz';
import UnjumbleCreateQuiz from '../components/Unjumble-Createquiz';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import templateComplete from '../assets/template_completesentence.png';
import templateFruit from '../assets/template_fruitslicing.png';
import templateUnjumble from '../assets/template_unjumble.png';
import { createNewQuiz, editExistingQuiz, getQuizInfos } from '../service/quiz';
import * as XLSX from 'xlsx';
import templateCompleteFile from '../assets/template_complete_sentence.xlsx';
import templateFruitFile from '../assets/template_fruit_slicing.xlsx';
import templateUnjumbleFile from '../assets/template_unjumble.xlsx';
import { getUser } from '../service/auth';
import Modal from "../components/Modal";
import { getLeaderboard } from '../service/record';
import Leaderboard from '../components/Leaderboard';


function CreateQuizPage() {
  const { quizID } = useParams();
  const navigate = useNavigate();

  const imageMap = {
    completesentence: templateComplete,
    fruitslicing: templateFruit,
    unjumble: templateUnjumble,
  };


  const [title, setTitle] = useState("Title of the quiz");
  const [quizType, setQuizType] = useState("Unjumble");
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [timeLimit, setTimeLimit] = useState(15);
  const [openLeaderboard, setOpenLeaderboard] = useState(false);
  const [leaderboards, setLeaderboards] = useState([]);

  async function fetchQuizInfo(){
    if (quizID === 'newquiz'){
      return
    }
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
    else if(quiztype === 'fruitslicing'){
      const questions = [
      { instruction: resp.quiz.questionGroup, 
        options: resp.quiz.options, 
        corrects: resp.quiz.corrects
      }]
      setQuestions(questions)
      setTimeLimit(resp.quiz.timeConfig)
    }
    else if(quiztype === 'unjumble'){
      let questions = []
      for (let i = 0; i < resp.quiz.answers.length; i++) {
        questions.push({ jumbledWords: resp.quiz.jumbledWords[i], answer: resp.quiz.answers[i] })
      }
      setQuestions(questions)
    }

    const quizModels = {
        "fruitslicing": "Fruit Slicing",
        "unjumble": "Unjumble",
        "completesentence": "Complete Sentence"
    };
    
    setTitle(resp.quiz.title);
    setQuizType(quizModels[quiztype])
  } 

  async function handleSaveQuiz(){
    // preprocess
    const userId = getUser()._id;
    const cleanType = quizType.toLowerCase().replace(/\s+/g, ""); 
    let quizData = {}

    if (cleanType === 'fruitslicing'){
      quizData = {
        userId: userId,
        title: title,
        questionGroup: questions[0].instruction, 
        timeConfig: timeLimit, 
        options: questions[0].options, 
        corrects: questions[0].corrects
      }
    }
    else if(cleanType === 'completesentence'){
      let curr_questions = []
      let curr_answers = []
      for (let i = 0; i < questions.length; i++) {
        curr_questions.push(questions[i].question)
        curr_answers.push(questions[i].answer)
      }
      quizData = {
        userId: userId,
        title: title,
        questions: curr_questions, 
        answers: curr_answers
      }
    }
    else if(cleanType === 'unjumble'){
      let curr_jumbleds = []
      let curr_answers = []
      for (let i = 0; i < questions.length; i++) {
        curr_jumbleds.push(questions[i].jumbledWords)
        curr_answers.push(questions[i].answer)
      }
      quizData = {
        userId: userId,
        title: title,
        jumbledWords: curr_jumbleds, 
        answers: curr_answers
      }
    }

    if(quizID === 'newquiz'){
      const resp = await createNewQuiz(cleanType, quizData)
      if (resp === false){
        toast.error('Failed to create quiz.')
      }
      else{
        toast.success('New quiz successfully created!')
        navigate('/')
      }
    }
    else{
      const resp = await editExistingQuiz(quizID, cleanType, quizData)
      if (resp === false){
        toast.error('Failed to edit quiz.')
      }
      else{
        toast.success('Quiz successfully updated!')
        navigate('/')
      }
    }
  }

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      if (jsonData.length === 0) {
        toast.error("Empty file.");
        return;
      }

      const headers = jsonData[0].map((h) => h?.trim()?.toLowerCase());
      const rows = jsonData.slice(1);

      let parsedQuestions = [];
      let detectedType = "";

      if (headers.includes("jumbled words")) {
        detectedType = "Unjumble";
        parsedQuestions = rows.map((row) => {
          const answer = row[headers.indexOf("answer")];
          const jumbledWords = row.slice(headers.indexOf("jumbled words")).filter(Boolean);
          return { answer, jumbledWords };
        });
      }
      else if (headers.includes("options") && headers.includes("corrects")) {
        detectedType = "Fruit Slicing";
        const question = rows[0][headers.indexOf("question")];

        const options = rows
          .map((row) => row[headers.indexOf("options")])
          .filter(Boolean);

        const corrects = rows
          .map((row) => row[headers.indexOf("corrects")])
          .filter(Boolean);

        parsedQuestions = [
          {
            instruction: question,
            options,
            corrects,
          },
        ];
      }
      else if (headers.includes("question") && headers.includes("answer")) {
        detectedType = "Complete Sentence";

        parsedQuestions = rows.map((row) => ({
          question: row[headers.indexOf("question")],
          answer: row[headers.indexOf("answer")]
        }));
      }
      else {
        toast.error("Unrecognized file format. Please use a valid template.");
        return;
      }

      if(quizID !== 'newquiz' && detectedType !== quizType){
        toast.error("Wrong file format. Please use a valid template.");
        return;
      }

      setQuizType(detectedType);
      setQuestions(parsedQuestions);

      const fileName = file.name.replace(/\.[^/.]+$/, ""); 
      setTitle(fileName);
      toast.success(`Detected "${detectedType}" with ${parsedQuestions.length} questions!`);

    } catch (error) {
      console.error(error);
      toast.error("Failed to read file.");
    }
  };

  const handleDownloadTemplate = () => {
    const cleanType = quizType.toLowerCase().replace(/\s+/g, "");
    
    let templateFile;
    let fileName;

    switch (cleanType) {
      case "completesentence":
        templateFile = templateCompleteFile;
        fileName = "template_complete_sentence.xlsx";
        break;
      case "fruitslicing":
        templateFile = templateFruitFile;
        fileName = "template_fruit_slicing.xlsx";
        break;
      case "unjumble":
        templateFile = templateUnjumbleFile;
        fileName = "template_unjumble.xlsx";
        break;
      default:
        toast.error("No template available for this quiz type.");
        return;
    }

    const link = document.createElement("a");
    link.href = templateFile;
    link.download = fileName;
    link.click();
  };

  const onOpenLeaderboard = async() =>{
    const leaderboardRes = await getLeaderboard(quizID);
    if(leaderboardRes === null){
      toast.info("There is no player yet");
      return;
    }

    const sortedTracks = [...leaderboardRes].sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;         
      return a.timeTaken - b.timeTaken;                          
    });
    setLeaderboards(sortedTracks);
    setOpenLeaderboard(true);
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

        <div>
          {quizID !== 'newquiz' &&
            <button onClick={()=>onOpenLeaderboard()}
              className="px-6 py-2 mr-3 rounded-full bg-[#6D94C5] text-white text-lg font-semibold shadow-md hover:bg-[#4c6e98] transition cursor-pointer"
              style={{ fontFamily: "Nunito" }}
            >
              Show Leaderboard
            </button>
          }

        <button onClick={handleSaveQuiz}
          className="px-6 py-2 mr-3 rounded-full bg-[#6D94C5] text-white text-lg font-semibold shadow-md hover:bg-[#4c6e98] transition cursor-pointer"
          style={{ fontFamily: "Nunito" }}
        >
          {quizID === 'newquiz' ? 'Publish' : 'Save'}
        </button>
        </div>
      </div>

      <Modal isOpen={openLeaderboard} onClose={() => setOpenLeaderboard(false)}>
        
        <Leaderboard tracks={leaderboards} />

        <button
          onClick={() => setOpenLeaderboard(false)}
          className="px-6 mt-4 py-2 mr-3 rounded-full bg-[#6D94C5] text-white text-lg font-semibold shadow-md hover:bg-[#4c6e98] transition cursor-pointer"
          style={{ fontFamily: "Nunito" }}
        >
          Close
        </button>
      </Modal>

      <div className="flex items-center justify-between">
          <div className="bg-white w-8/10 rounded-2xl shadow-lg p-4 m-5 ml-15 mt-8 min-h-[620px] mb-10">
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
                ) : quizType === "Fruit Slicing" ? (
                  <FruitSlicingCreateQuiz questions={questions} />
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
          className="rounded-lg shadow-md w-2/10 min-h-[620px] p-8 m-5 mt-8 bg-[#CBDCEB]/60 mb-10"
          style={{fontFamily: "Nunito" }}
        >
          {/* Upload Section */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-[#526E88] mb-2">
              Upload Questions
            </h3>
            
            <input
              type="file"
              accept=".xlsx,.csv"
              id="fileUpload"
              onChange={handleFileUpload}
              className="hidden"
            />
            <label
              htmlFor="fileUpload"
              className="cursor-pointer flex p-2 items-center w-full border border-gray-300 rounded-md bg-white py-2 hover:bg-gray-50 transition"
            >
              <FontAwesomeIcon icon={faUpload} className="mr-2 text-[#868686]" />
              <span className='text-[#868686] font-semibold'>Upload File</span>
            </label>
              
            <p className="text-sm text-[#526E88] mt-1 font-normal" style={{fontFamily: "Nunito"}}>
              *Only accept xlsx and csv files
              Please rename your file to your quiz title!
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
              disabled = {quizID === 'newquiz' ? false : true}
              className="w-full border border-gray-300 outline-none rounded-md p-2 
              bg-white cursor-pointer hover:bg-gray-50 transition disabled:bg-gray-200"
            >
              <option>Complete Sentence</option>
              <option>Fruit Slicing</option>
              <option>Unjumble</option>
            </select>
            <button
              onClick={handleDownloadTemplate}
              className="text-[#526E88] text-sm mt-2 underline hover:text-black cursor-pointer bg-transparent border-none"
            >
              Download question template
            </button>
          </div>

          {/* Time Limit (only for Fruit Slicing) */}
          {quizType === "Fruit Slicing" && (
            <div className="mb-4">
              <div className="flex items-center justify-between">
                <h3
                  className="text-lg font-bold text-[#526E88] mr-3 whitespace-nowrap"
                  style={{ fontFamily: "Nunito" }}
                >
                  Time Limit (s)
                </h3>

                <input
                  type="number"
                  min="5"
                  max="120"
                  step="5"
                  placeholder="15"
                  value={timeLimit}
                  onChange={(e) => setTimeLimit(Number(e.target.value))}
                  className="border border-gray-300 rounded-md p-2 w-24 outline-none 
                            text-[#526E88] text-center
                            focus:ring-2 focus:ring-[#6D94C5] bg-white"
                  style={{ fontFamily: "Nunito" }}
                />
              </div>
            </div>
          )}



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