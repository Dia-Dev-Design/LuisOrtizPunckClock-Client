import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import logo from "../assets/DiaLogoPrimary.png";

const Navbar = () => {
  const { logOutUser, getToken, getUsername } = useContext(AuthContext);
  const [user, setUser] = useState("");

  useEffect(() => {
    if (!user) {
      let thisUser = getUsername();
      setUser(thisUser);
    }
  }, []);

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-aquaGreen bg-absolute-dark-green text-white text-absolute-white shadow-lg flex items-center justify-between px-6 h-20 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <img 
          src={logo} 
          alt="Dia Dev & Design Logo" 
          className="h-12 w-auto drop-shadow-sm hover:scale-105 transition-transform duration-200" 
        />
        <span className="text-2xl font-bold tracking-tight text-absolute-white hover:text-mint transition-colors duration-200">
          Día Dev & Design
        </span>
      </div>
      
      <div className="flex items-center gap-6">
        <Link 
          to="/" 
          className="hover:text-mint hover:text-absolute-mint transition-colors duration-200 text-lg font-medium text-absolute-white relative group"
        >
          Home
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-mint bg-absolute-mint transition-all duration-200 group-hover:w-full"></span>
        </Link>
        
        {getToken() && (
          <Link 
            to="/punchclock" 
            className="hover:text-mint hover:text-absolute-mint transition-colors duration-200 text-lg font-medium text-absolute-white relative group"
          >
            Punch Clock
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-mint bg-absolute-mint transition-all duration-200 group-hover:w-full"></span>
          </Link>
        )}
        
        {!getToken() && (
          <span className="text-lg font-semibold text-mint text-absolute-mint animate-pulse">
            Welcome to PunchClock!
          </span>
        )}
        
        {getToken() && (
          <>
            <span className="text-lg font-semibold text-skyBlue text-absolute-sky drop-shadow-sm">
              Welcome, {user || "User"}!
            </span>
            <button
              onClick={logOutUser}
              className="ml-4 px-5 py-2.5 rounded-lg bg-mint bg-absolute-mint text-aquaGreen text-absolute-dark-green font-bold hover:bg-skyBlue hover:bg-absolute-sky hover:text-white hover:text-absolute-white transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 active:scale-95"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
