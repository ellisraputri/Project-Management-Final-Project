import "../App.css"

export default function Navbar({isTeacher}) {
    return (
        <div className="navbar shadow-sm">
          <div className="navbar-start">
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
              style={isTeacher? {backgroundColor: "white", fontFamily: "Nunito", color:"#6d94c5"}: {backgroundColor: "#6d94c5", fontFamily: "Nunito", color:"white"}}>
                {isTeacher? "Logout" : "Login as Teacher"} 
            </a>
          </div>
        </div>
    )
}