import { useState, useContext, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";

const Home = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const { user } = useContext(AuthContext);
  const timeoutRef = useRef(null);
  
  // Clear any pending timeouts when component unmounts
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleCheckboxChange = (event) => {
    const newChecked = event.target.checked;
    setIsChecked(newChecked);
    
    // Hide the current form first
    setShowForm(false);
    
    // Then show the new form after a short delay
    // This prevents rapid mounting/unmounting of components
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      setShowForm(true);
    }, 50);
  };

  // Initialize form visibility on first render
  useEffect(() => {
    setShowForm(true);
  }, []);

  return (
    <div className="HomePage">
      <h1>Dia Dev Clock In</h1>

      {!user ? (
        <>
          <div>
            <label htmlFor="toggle-details">Login</label>
            <label className="toggle">
              <input
                type="checkbox"
                id="toggle-details"
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
              <span className="slider"></span>
            </label>
            <label htmlFor="toggle-details">Signup</label>
          </div>

          {showForm && (
            isChecked ? <SignupForm key="signup" /> : <LoginForm key="login" />
          )}
        </>
      ) : (
        <Link to="/punchclock">Punch Clock</Link>
      )}
    </div>
  );
};

export default Home;
