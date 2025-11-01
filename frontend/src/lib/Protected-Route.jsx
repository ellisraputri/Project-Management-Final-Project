import { isTeacher } from "../service/auth";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children}) => {
  const isLoggedIn = isTeacher();
  const location = useLocation();

  if (isLoggedIn && !location.pathname.includes("teacher")){
    return <Navigate to="/teacher-quizlist" replace />;
  }

  if (!isLoggedIn && location.pathname.includes("teacher")){
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;