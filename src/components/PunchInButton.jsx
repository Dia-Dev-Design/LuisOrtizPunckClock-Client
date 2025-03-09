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
    <button className='punchIn' onClick={handlePunchIn} disabled={isDisabled}>
      Clock In
    </button>
  );
};

export default PunchInButton;