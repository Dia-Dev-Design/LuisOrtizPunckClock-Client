import { useContext } from 'react';
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

  return (
    <button className='punchOut' onClick={handlePunchOut} disabled={isDisabled}>
      Clock Out
    </button>
  );
};

export default PunchOutButton;