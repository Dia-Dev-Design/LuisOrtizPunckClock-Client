import React, { useState, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import logo from "../assets/DiaLogoPrimary.png";
import bgImage from "../assets/bg-img.png";
// Import components lazily to prevent render cascades
const LoginForm = React.lazy(() => import("../edge/LoginForm"));
const SignupForm = React.lazy(() => import("../edge/SignupForm"));

const EdgeHome = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { user } = useContext(AuthContext);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className="min-h-screen flex font-sans" 
         style={{
           background: '#1e293b', // Clean dark blue background
           minHeight: '100vh'
         }}>
      
      {/* Left Sidebar - Clean background with undistorted logo */}
      <div className="hidden lg:flex lg:w-2/5 relative overflow-hidden">
        {/* Clean dark blue background with subtle gradient */}
        <div 
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(135deg, 
                #1e293b 0%, 
                #334155 50%,
                #475569 100%
              )
            `
          }}
        />
        
        {/* Content Overlay with undistorted logo */}
        <div className="relative z-10 flex flex-col justify-center items-center text-white p-12">
          {/* Use the actual undistorted logo */}
          <img 
            src={logo} 
            alt="Dia Dev & Design Logo" 
            className="w-24 h-24 mb-8 opacity-90 hover:scale-110 transition-transform duration-300 drop-shadow-lg" 
            style={{
              filter: 'none' // Ensure no distortion
            }}
          />
          
          <h1 className="text-4xl font-black mb-4 text-center text-white">
            Every-<span style={{ color: '#48D994' }}>Día</span>.
          </h1>
          <h2 className="text-2xl font-bold mb-2 text-center text-white">We build. We create.</h2>
          <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: '#48D994' }}>You succeed!</h2>
          <p className="text-lg text-center max-w-sm leading-relaxed text-gray-300">
            We partner with you to craft tailored applications that meet your unique requirements, operational needs, and strategic goals.
          </p>
        </div>
      </div>

      {/* Right Panel - Clean dark blue with white form inputs */}
      <div className="flex-1 flex flex-col justify-center items-center p-8"
           style={{ background: '#1e293b' }}>
        <div className="w-full max-w-md">
          {/* Toggle Button */}
          <div className="text-right mb-8">
            <button
              onClick={toggleForm}
              className="text-lg font-semibold transition-all duration-200 hover:scale-105"
              style={{ 
                color: '#48D994'
              }}
            >
              {isLogin ? "Create Account" : "Login"}
            </button>
          </div>

          {/* Form Container - Clean design with white inputs */}
          <div className="rounded-2xl shadow-2xl p-8"
               style={{
                 background: '#334155', // Slightly lighter dark blue
                 border: '1px solid #475569'
               }}>
            {!user ? (
              <>
                {isLogin ? (
                  <React.Suspense fallback={
                    <div className="text-center text-gray-400">
                      <div className="animate-spin rounded-full h-8 w-8 mx-auto mb-4"
                           style={{ 
                             border: '2px solid rgba(72, 217, 148, 0.3)',
                             borderTop: '2px solid #48D994'
                           }}></div>
                      Loading...
                    </div>
                  }>
                    <LoginForm />
                  </React.Suspense>
                ) : (
                  <React.Suspense fallback={
                    <div className="text-center text-gray-400">
                      <div className="animate-spin rounded-full h-8 w-8 mx-auto mb-4"
                           style={{ 
                             border: '2px solid rgba(72, 217, 148, 0.3)',
                             borderTop: '2px solid #48D994'
                           }}></div>
                      Loading...
                    </div>
                  }>
                    <SignupForm />
                  </React.Suspense>
                )}
              </>
            ) : (
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-4" style={{ color: '#48D994' }}>Welcome back!</h2>
                <button
                  onClick={() => {
                    setTimeout(() => {
                      window.location.href = "/punchclock";
                    }, 100);
                  }}
                  className="w-full py-3 rounded-lg font-bold text-lg transition-all duration-200 hover:scale-105 hover:shadow-lg"
                  style={{
                    background: 'linear-gradient(45deg, #48D994, #2A6E6A)',
                    color: '#ffffff',
                    boxShadow: '0 5px 15px rgba(72, 217, 148, 0.3)'
                  }}
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

export default EdgeHome; 