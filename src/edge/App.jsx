import '../App.css'
import { useContext, useEffect, useState } from 'react';
import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import Navbar from '../components/Navbar';
import Home from '../edge/Home';
import PunchClock from '../pages/PunchClock';

function EdgeApp() {
  const { getToken } = useContext(AuthContext);
  const [isEdgeForcingDark, setIsEdgeForcingDark] = useState(false);

  const IsLoggedIn = () => {
    return getToken() ? <Outlet /> : <Navigate to='/' />;
  };

  // Detect if Edge is forcing dark mode and apply appropriate styling
  useEffect(() => {
    console.log('🎨 EdgeApp: Starting Edge detection and styling...');
    
    const detectEdgeDarkMode = () => {
      setTimeout(() => {
        const bodyBg = window.getComputedStyle(document.body).backgroundColor;
        const htmlBg = window.getComputedStyle(document.documentElement).backgroundColor;
        
        console.log('🔍 EdgeApp - Body BG:', bodyBg);
        console.log('🔍 EdgeApp - HTML BG:', htmlBg);
        
        // Check if Edge is forcing dark backgrounds
        const isDarkForced = (
          bodyBg.includes('0, 0, 0') || 
          bodyBg.includes('18, 18, 18') ||
          bodyBg.includes('32, 32, 32') ||
          bodyBg.includes('33, 37, 41') ||
          htmlBg.includes('0, 0, 0') ||
          htmlBg.includes('18, 18, 18') ||
          htmlBg.includes('32, 32, 32') ||
          bodyBg === 'rgb(0, 0, 0)' ||
          bodyBg === 'black' ||
          bodyBg === 'rgba(0, 0, 0, 1)'
        );
        
        console.log('🎯 EdgeApp - Edge forcing dark?', isDarkForced);
        setIsEdgeForcingDark(isDarkForced);
        
        if (isDarkForced) {
          console.log('💙 EdgeApp - Applying clean dark blue override');
          applyDarkBlueOverride();
        }
      }, 300);
    };

    const applyDarkBlueOverride = () => {
      // Nuclear option - override everything with our clean dark blue
      const forceStyles = () => {
        document.documentElement.style.setProperty('background', '#1e293b', 'important');
        document.documentElement.style.setProperty('background-color', '#1e293b', 'important');
        document.body.style.setProperty('background', '#1e293b', 'important');
        document.body.style.setProperty('background-color', '#1e293b', 'important');
        document.body.style.setProperty('color', '#ffffff', 'important');
        
        const root = document.getElementById('root');
        if (root) {
          root.style.setProperty('background', '#1e293b', 'important');
          root.style.setProperty('background-color', '#1e293b', 'important');
          root.style.setProperty('color', '#ffffff', 'important');
        }
      };

      // Apply immediately and every 100ms for first 5 seconds
      forceStyles();
      const aggressiveInterval = setInterval(forceStyles, 100);
      
      setTimeout(() => {
        clearInterval(aggressiveInterval);
        // Then every 500ms ongoing
        setInterval(forceStyles, 500);
      }, 5000);

      // Inject aggressive CSS
      const style = document.createElement('style');
      style.id = 'edge-dark-blue-nuclear';
      style.textContent = `
        html, html *, body, body *, #root, #root * {
          background: #1e293b !important;
          background-color: #1e293b !important;
        }
        
        html, body, #root {
          color: #ffffff !important;
        }
        
        /* Specifically target the main containers */
        .App {
          background: #1e293b !important;
          background-color: #1e293b !important;
          color: #ffffff !important;
        }
        
        /* Override any forced dark backgrounds */
        div[style*="background-color"] {
          background-color: #1e293b !important;
        }
        
        /* Keep form inputs white */
        input {
          background: #ffffff !important;
          background-color: #ffffff !important;
          color: #1f2937 !important;
        }
      `;
      document.head.appendChild(style);
    };

    detectEdgeDarkMode();

    return () => {
      const existingStyle = document.getElementById('edge-dark-blue-nuclear');
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, []);

  // Clean dark blue compromise - professional and intentional
  return (
    <div className='App min-h-screen' 
         style={{
           background: isEdgeForcingDark ? '#1e293b !important' : '#1e293b',
           backgroundColor: isEdgeForcingDark ? '#1e293b !important' : '#1e293b',
           color: '#ffffff !important',
           minHeight: '100vh'
         }}>
      
      {/* Clean dark mode optimized navbar */}
      <nav className="w-full fixed top-0 left-0 z-50 shadow-lg flex items-center justify-between px-6 h-20"
           style={{
             background: '#334155 !important',
             backgroundColor: '#334155 !important',
             borderBottom: '1px solid #475569'
           }}>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full flex items-center justify-center"
               style={{ background: 'linear-gradient(45deg, #48D994, #2A6E6A)' }}>
            <span className="text-white font-bold text-xl">DD</span>
          </div>
          <span className="text-2xl font-bold tracking-tight text-white">
            Día Dev & Design
          </span>
        </div>
        
        <div className="flex items-center gap-6">
          <a href="/" className="text-white hover:text-mint transition-colors text-lg font-medium">
            Home
          </a>
          {getToken() && (
            <a href="/punchclock" className="text-white hover:text-mint transition-colors text-lg font-medium">
              Punch Clock
            </a>
          )}
          {!getToken() && (
            <span className="text-lg font-semibold text-mint">
              Welcome to PunchClock!
            </span>
          )}
        </div>
      </nav>

      <div style={{ 
        paddingTop: '80px', 
        background: isEdgeForcingDark ? '#1e293b !important' : '#1e293b',
        backgroundColor: isEdgeForcingDark ? '#1e293b !important' : '#1e293b',
        minHeight: 'calc(100vh - 80px)' 
      }}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route element={<IsLoggedIn/>}>
            <Route path='/punchclock' element={<PunchClock />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default EdgeApp; 