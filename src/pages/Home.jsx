import React, { useState, useContext } from "react";

import { AuthContext } from "../context/auth.context";
// Import components lazily to prevent render cascades
const LoginForm = React.lazy(() => import("../components/LoginForm"));
const SignupForm = React.lazy(() => import("../components/SignupForm"));

const Home = () => {
  // Use a single formType state instead of a boolean
  const [formType, setFormType] = useState("login");
  const { user } = useContext(AuthContext);

  // Handle form type change without triggering re-renders of both components
  const handleFormChange = (event) => {
    // Use the actual value instead of a checked state
    setFormType(event.target.value);
  };

  return (
    <div className="HomePage">
      <h1>Dia Dev Clock In</h1>

      {!user ? (
        <>
          <div>
            {/* Use radio buttons instead of a toggle for more explicit control */}
            <label className="radios">
              <input
                type="radio"
                name="formType"
                value="login"
                checked={formType === "login"}
                onChange={handleFormChange}
              />
              Login
            </label>
            <label className="radios">
              <input
                type="radio"
                name="formType"
                value="signup"
                checked={formType === "signup"}
                onChange={handleFormChange}
              />
              Signup
            </label>
          </div>

          {/* Use a wrapper div that remains mounted */}
          <div className="form-container">
            {/* Only render ONE form at a time, never both */}
            {formType === "login" && (
              <React.Suspense fallback={<div>Loading...</div>}>
                <LoginForm />
              </React.Suspense>
            )}
            {formType === "signup" && (
              <React.Suspense fallback={<div>Loading...</div>}>
                <SignupForm />
              </React.Suspense>
            )}
          </div>
        </>
      ) : (
        // Prevent immediate navigation with a button instead of direct Link
        <button
          onClick={() => {
            // Add a small delay before navigation
            setTimeout(() => {
              window.location.href = "/punchclock";
            }, 100);
          }}
        >
          Go to Punch Clock
        </button>
      )}
    </div>
  );
};

export default Home;
