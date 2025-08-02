import { useEffect, useState } from "react";

import EdgeApp from "../edge/App";
import StandardApp from '../standard/App'

const BrowserSetter = () => {
  const [browserType, setBrowserType] = useState(null)

  const detectBrowser = () => {
    const userAgent = navigator.userAgent;
    console.log('🌐 User Agent:', userAgent);
    
    // Detect Edge (both Chromium-based and Legacy)
    const isEdge = /Edg|Edge/.test(userAgent);
    
    if (isEdge) {
      console.log('🔍 Browser detected: Edge - Using EdgeApp with aggressive styling');
      setBrowserType('edge');
    } else {
      console.log('🔍 Browser detected: Standard (Chrome/Firefox/Safari) - Loading standard app');
      setBrowserType('standard');
    }
  }

  useEffect(() => {
    detectBrowser();
  }, [])

  return (
    <>
      {
        browserType === 'edge' ?
          <EdgeApp /> 
        :
        browserType === 'standard' ?
          <StandardApp /> 
        :
        <div className="flex items-center justify-center min-h-screen bg-white">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-mint mx-auto mb-4"></div>
            <p className="text-gray-600">Detecting browser...</p>
          </div>
        </div>
      }
    </>
  )
};

export { BrowserSetter }; 