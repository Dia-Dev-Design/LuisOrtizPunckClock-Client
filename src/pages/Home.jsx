import { useState, useContext, useCallback } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";

const Home = () => {
  // Use lazy initialization for state
  const [isChecked, setIsChecked] = useState(false);
  const { user } = useContext(AuthContext);

  // Memoize the handler to prevent recreation on each render
  const handleCheckboxChange = useCallback((event) => {
    setIsChecked(event.target.checked);
  }, []);
  
  // Memoize which form to show to avoid unnecessary re-renders
  const FormComponent = isChecked ? SignupForm : LoginForm;

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

          {/* Use a single component reference instead of conditional rendering */}
          <FormComponent />
        </>
      ) : (
        <Link to="/punchclock">Punch Clock</Link>
      )}
    </div>
  );
};

export default Home;
