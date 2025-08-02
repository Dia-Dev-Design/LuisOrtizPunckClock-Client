import { useContext, useEffect } from 'react';
import axios from 'axios';
import { DateTime } from 'luxon';
import { SERVER_URL } from '../services/SERVER_URL';
import { AuthContext } from '../context/auth.context';

const PunchOutButton = ({ punchInId, onPunchOut, isDisabled }) => {
  const { getUser } = useContext(AuthContext);
  const { id: userId } = getUser();

  const handlePunchOut = () => {
    const currentTime = DateTime.now().toISO();

    const requestBody = {
      punchOut: currentTime
    };

    console.log("This is the button being clicked", punchInId)

    axios
      .put(`${SERVER_URL}/punchclock/${punchInId}`, requestBody)
      .then((response) => {
        const updatedTime = response.data;

        if (onPunchOut) {
          onPunchOut(); // Notify parent component
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    console.log("This is the disabled status of punch out button +++++>", isDisabled)
  }, [isDisabled])

  return (
    <button 
      className={`
        px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 transform
        ${isDisabled 
          ? 'bg-gray-300 bg-absolute-gray text-gray-500 text-absolute-gray cursor-not-allowed opacity-50' 
          : 'bg-skyBlue bg-absolute-sky text-white text-absolute-white hover:bg-aquaGreen hover:bg-absolute-aqua hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl'
        }
        min-w-[160px] force-light-mode
      `}
      onClick={handlePunchOut} 
      disabled={isDisabled}
    >
      <div className="flex items-center justify-center gap-2">
        <svg 
          className="w-5 h-5" 
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-3.707-8.707l3-3a1 1 0 011.414 1.414L9.414 9H13a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
        Clock Out
      </div>
    </button>
  );
};

export default PunchOutButton;