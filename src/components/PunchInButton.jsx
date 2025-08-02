import { useContext } from 'react';
import axios from 'axios';
import { DateTime } from 'luxon';
import { SERVER_URL } from '../services/SERVER_URL';
import { AuthContext } from '../context/auth.context';

const PunchInButton = ({ onPunchIn, isDisabled }) => {
  const { getUser } = useContext(AuthContext);
  const userId = getUser();

  const handlePunchIn = () => {
    const currentTime = DateTime.now().toISO();

    const requestBody = {
      user: userId,
      punchIn: currentTime,
      punchOut: ''
    };

    axios
      .post(`${SERVER_URL}/punchclock`, requestBody)
      .then((response) => {
        const time = response.data;

        if (onPunchIn) {
          onPunchIn(time._id); // Pass the punchInId back to the parent component
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <button 
      className={`
        px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 transform
        ${isDisabled 
          ? 'bg-gray-300 bg-absolute-gray text-gray-500 text-absolute-gray cursor-not-allowed opacity-50' 
          : 'bg-mint bg-absolute-mint text-aquaGreen text-absolute-dark-green hover:bg-skyBlue hover:bg-absolute-sky hover:text-white hover:text-absolute-white hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl'
        }
        min-w-[160px] force-light-mode
      `}
      onClick={handlePunchIn} 
      disabled={isDisabled}
    >
      <div className="flex items-center justify-center gap-2">
        <svg 
          className="w-5 h-5" 
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
        </svg>
        Clock In
      </div>
    </button>
  );
};

export default PunchInButton;