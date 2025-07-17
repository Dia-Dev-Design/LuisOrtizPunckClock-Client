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
    <nav className="w-full fixed top-0 left-0 z-50 bg-aquaGreen text-white shadow-md flex items-center justify-between px-6 h-20">
      <div className="flex items-center gap-3">
        <img src={logo} alt="Dia Dev & Design Logo" className="h-12 w-auto" />
        <span className="text-2xl font-bold tracking-tight">Día Dev & Design</span>
      </div>
      <div className="flex items-center gap-6">
        <Link to="/" className="hover:text-mint transition-colors text-lg font-medium">Home</Link>
        {getToken() && (
          <Link to="/punchclock" className="hover:text-mint transition-colors text-lg font-medium">Punch Clock</Link>
        )}
        {!getToken() && (
          <span className="text-lg font-semibold text-mint">Welcome to PunchClock!</span>
        )}
        {getToken() && (
          <>
            <span className="text-lg font-semibold text-skyBlue">Welcome, {user || "User"}!</span>
            <button
              onClick={logOutUser}
              className="ml-4 px-4 py-2 rounded-lg bg-mint text-aquaGreen font-bold hover:bg-skyBlue hover:text-white transition-colors shadow"
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
