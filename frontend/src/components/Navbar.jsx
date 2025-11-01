import { useNavigate } from "react-router-dom";
import "../App.css"
import { logout } from "../service/auth";
import { toast } from "react-toastify";

export default function Navbar({isTeacher}) {
  const navigate = useNavigate();

  const handleLogout = async() => {
    const isSuccess = await logout();
    if(isSuccess) {
      toast.success("Logout success!");
      navigate("/");
    }
    else toast.error("Logout failed. Please try again.");
  }

  const handleLogin = () => {
    navigate("/login");
  }

    return (
        <div className="navbar shadow-sm sticky top-0 z-50" style={{backgroundColor:"#F5EFE6"}}>
          <div className="navbar-start px-4">
            <div className="dropdown">
              <div tabIndex={0}>
                <img src="src/assets/logo.png" className="w-12 mr-3"/>
              </div>
            </div>
            <p 
              className="text-2xl font-bold mt-3" 
              style={{color: "#6D94C5", fontFamily: "Raleway"}}>
                CQGame Pro
            </p>
          </div>
          <div className="navbar-end">
            <a className="btn btn-ghost rounded-4xl outline-0 text-lg mr-2 hover:outline-none" 
              onClick={isTeacher? handleLogout : handleLogin}
              style={isTeacher? {backgroundColor: "white", fontFamily: "Nunito", color:"#6d94c5"}: {backgroundColor: "#6d94c5", fontFamily: "Nunito", color:"white"}}>
                {isTeacher? "Logout" : "Login as Teacher"} 
            </a>
          </div>
        </div>
    )
}