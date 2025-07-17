import React, { useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import logo from "../assets/DiaLogoPrimary.png";
import bgImage from "../assets/bg-img.png";
// Import components lazily to prevent render cascades
const LoginForm = React.lazy(() => import("../components/LoginForm"));
const SignupForm = React.lazy(() => import("../components/SignupForm"));

const Home = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { user } = useContext(AuthContext);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div 
      className="min-h-screen flex font-sans bg-marshmallow"
      style={{ backgroundColor: '#F2F2F2' }}
    >
      {/* Left Sidebar - Background Image & Branding */}
      <div className="hidden lg:flex lg:w-2/5 relative overflow-hidden">
        {/* Background Image with Brand Color Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${bgImage})`,
          }}
        >
          {/* Brand Color Overlay (Aqua Green gradient) */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-aquaGreen/20 to-aquaGreen/80"></div>
        </div>
        
        {/* Content Overlay */}
        <div className="relative z-10 flex flex-col justify-center items-center text-white p-12">
          <img src={logo} alt="Dia Dev & Design Logo" className="w-24 h-24 mb-8 opacity-90" />
          <h1 className="text-4xl font-black mb-4 text-center">
            Every-<span className="text-mint">Día</span>.
          </h1>
          <h2 className="text-2xl font-bold mb-2 text-center">We build. We create.</h2>
          <h2 className="text-2xl font-bold mb-6 text-center text-mint">You succeed!</h2>
          <p className="text-lg text-center max-w-sm leading-relaxed opacity-90">
            We partner with you to craft tailored applications that meet your unique requirements, operational needs, and strategic goals.
          </p>
        </div>
      </div>

      {/* Right Panel - Login/Signup Form */}
      <div className="flex-1 flex flex-col justify-center items-center bg-marshmallow p-8">
        <div className="w-full max-w-md">
          {/* Toggle Button */}
          <div className="text-right mb-8">
            <button
              onClick={toggleForm}
              className="text-aquaGreen hover:text-mint transition-colors font-semibold"
            >
              {isLogin ? "Create Account" : "Login"}
            </button>
          </div>

          {/* Form Container */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {!user ? (
              <>
                {isLogin ? (
                  <React.Suspense fallback={<div className="text-center">Loading...</div>}>
                    <LoginForm />
                  </React.Suspense>
                ) : (
                  <React.Suspense fallback={<div className="text-center">Loading...</div>}>
                    <SignupForm />
                  </React.Suspense>
                )}
              </>
            ) : (
              <div className="text-center">
                <h2 className="text-2xl font-bold text-aquaGreen mb-4">Welcome back!</h2>
                <button
                  onClick={() => {
                    setTimeout(() => {
                      window.location.href = "/punchclock";
                    }, 100);
                  }}
                  className="w-full py-3 rounded-lg bg-mint text-aquaGreen font-bold text-lg hover:bg-skyBlue hover:text-white transition-colors shadow"
                >
                  Go to Punch Clock
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
