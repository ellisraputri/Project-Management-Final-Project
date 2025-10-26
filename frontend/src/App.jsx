import "@fontsource/nunito";
import "@fontsource/nunito/700.css";
import "@fontsource/nunito/900-italic.css";
import './App.css';
import { BrowserRouter as Router, Route, Routes, useLocation, matchRoutes } from 'react-router-dom';
import Navbar from './components/Navbar';
import { ToastContainer } from 'react-toastify';
import WelcomePage from "./pages/Welcome-Page";
import LoginPage from "./pages/Login";
import UnjumblePage from "./pages/Unjumble";
import FruitNinjaPage from "./pages/Fruit-Ninja";
import CompleteSentencePage from "./pages/Complete-Sentence";
import QuizListPage from "./pages/Quiz-List";
import CreateQuizPage from "./pages/Create-Quiz";
import ProtectedRoute from "./lib/Protected-Route";
import NotFoundPage from "./pages/Not-Found";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <MainLayout/>
    </Router>
  );
}

function MainLayout() {
  const routes = [
    { path: "/" },
    { path: "/login" },
    { path: "/student-unjumble" },
    { path: "/student-fruitninja" },
    { path: "/student-completesentence" },
    { path: "/teacher-quizlist" },
    { path: "/teacher-createquiz" },
  ];
  
  const location = useLocation();
  const matchedRoute = matchRoutes(routes, location);
  const isTeacher = matchedRoute && location.pathname.includes("teacher");

  return (
      <>
        {!location.pathname.includes("login") && <Navbar isTeacher={isTeacher}/>}
        <main className="flex-1 min-h-screen">
          <ToastContainer />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<WelcomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/student-unjumble" element={<UnjumblePage />} />
            <Route path="/student-fruitninja" element={<FruitNinjaPage />} />
            <Route path="/student-completesentence" element={<CompleteSentencePage />} />

            {/* Teacher-only Routes */}
            <Route
              path="/teacher-quizlist"
              element={
                <ProtectedRoute allowedRoles={["teacher"]}>
                  <QuizListPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/teacher-createquiz"
              element={
                <ProtectedRoute allowedRoles={["teacher"]}>
                  <CreateQuizPage />
                </ProtectedRoute>
              }
            />

            {/* Catch-all for 404 */}
            <Route path="/*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer/>
      </>
  )
}

export default App
