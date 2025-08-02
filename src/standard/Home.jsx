import React, { useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import logo from "../assets/DiaLogoPrimary.png";
import bgImage from "../assets/bg-img.png";
// Import components lazily to prevent render cascades
const LoginForm = React.lazy(() => import("../components/LoginForm"));
const SignupForm = React.lazy(() => import("../components/SignupForm"));

const StandardHome = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { user } = useContext(AuthContext);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="min-h-screen flex font-sans bg-absolute-light force-light-mode">
      {/* Left Sidebar - Background Image & Branding */}
      <div className="hidden lg:flex lg:w-2/5 relative overflow-hidden">
        {/* Background Image with Brand Color Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 hover:scale-105"
          style={{
            backgroundImage: `url(${bgImage})`,
          }}
        >
          {/* Brand Color Overlay (Aqua Green gradient) */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-aquaGreen/20 to-aquaGreen/80"></div>
        </div>
        
        {/* Content Overlay */}
        <div className="relative z-10 flex flex-col justify-center items-center text-white text-absolute-white p-12">
          <img 
            src={logo} 
            alt="Dia Dev & Design Logo" 
            className="w-24 h-24 mb-8 opacity-90 hover:scale-110 transition-transform duration-300 drop-shadow-lg" 
          />
          <h1 className="text-4xl font-black mb-4 text-center text-absolute-white">
            Every-<span className="text-mint text-absolute-mint">Día</span>.
          </h1>
          <h2 className="text-2xl font-bold mb-2 text-center text-absolute-white">We build. We create.</h2>
          <h2 className="text-2xl font-bold mb-6 text-center text-mint text-absolute-mint">You succeed!</h2>
          <p className="text-lg text-center max-w-sm leading-relaxed opacity-90 text-absolute-white">
            We partner with you to craft tailored applications that meet your unique requirements, operational needs, and strategic goals.
          </p>
        </div>
      </div>

      {/* Right Panel - Login/Signup Form - LIGHT MODE OPTIMIZED */}
      <div className="flex-1 flex flex-col justify-center items-center p-8 bg-marshmallow bg-absolute-light">
        <div className="w-full max-w-md">
          {/* Toggle Button */}
          <div className="text-right mb-8">
            <button
              onClick={toggleForm}
              className="text-aquaGreen text-absolute-aqua hover:text-mint hover:text-absolute-mint transition-all duration-200 font-semibold text-lg hover:scale-105 active:scale-95"
            >
              {isLogin ? "Create Account" : "Login"}
            </button>
          </div>

          {/* Form Container - Optimized for light mode */}
          <div className="bg-white bg-absolute-white rounded-2xl shadow-xl p-8 border border-gray-100 border-absolute-gray hover:shadow-2xl transition-shadow duration-300">
            {!user ? (
              <>
                {isLogin ? (
                  <React.Suspense fallback={
                    <div className="text-center text-gray-600 text-absolute-gray">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-mint border-absolute-mint mx-auto mb-4"></div>
                      Loading...
                    </div>
                  }>
                    <LoginForm />
                  </React.Suspense>
                ) : (
                  <React.Suspense fallback={
                    <div className="text-center text-gray-600 text-absolute-gray">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-mint border-absolute-mint mx-auto mb-4"></div>
                      Loading...
                    </div>
                  }>
                    <SignupForm />
                  </React.Suspense>
                )}
              </>
            ) : (
              <div className="text-center">
                <h2 className="text-2xl font-bold text-aquaGreen text-absolute-aqua mb-4">Welcome back!</h2>
                <button
                  onClick={() => {
                    setTimeout(() => {
                      window.location.href = "/punchclock";
                    }, 100);
                  }}
                  className="w-full py-3 rounded-lg bg-mint bg-absolute-mint text-aquaGreen text-absolute-dark-green font-bold text-lg hover:bg-skyBlue hover:bg-absolute-sky hover:text-white hover:text-absolute-white transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 active:scale-95"
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

export default StandardHome; 