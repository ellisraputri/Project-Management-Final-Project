// import { AppContent } from "src/context/AppContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";


const ProtectedRoute = ({ children, allowedRoles }) => {
//   const { userData } = useContext(AppContent); 

//   // guest can only access the public view
//   if(!userData){
//     return (<Navigate to="/" />);
//   }

//   if(!userData.isAccountVerified){
//     return (<Navigate to="/" />);  
//   }

//   // redirect to each role's main page if they try to access unallowed link
//   if (!allowedRoles.includes(userData.role)) {
//     if(userData.role === 'admin') return (<Navigate to="/admindashboard" />);
//     if(userData.role === 'participant') return (<Navigate to="/userhome" />); 
//   }

//   return children;

    if(allowedRoles === "teacher") return (<Navigate to="/teacher-quizlist"/>);
    else return children;
};

export default ProtectedRoute;