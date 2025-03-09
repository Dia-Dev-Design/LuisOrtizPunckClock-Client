import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import LoginForm from "../components/LoginForm";
import SignupForm from "../components/SignupForm";

const Home = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const { user } = useContext(AuthContext);

  return (
    <div className="HomePage">
      <h1>Dia Dev Clock In</h1>

      {user ? (
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

          {!isChecked && <LoginForm />}

          {isChecked && <SignupForm />}
        </>
      ) : (
        <Link to="/punchclock">Punch Clock</Link>
      )}
    </div>
  );
};

export default Home;
