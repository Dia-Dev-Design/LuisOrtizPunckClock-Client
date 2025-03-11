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
    <button className='punchOut' onClick={handlePunchOut} disabled={isDisabled}>
      Clock Out
    </button>
  );
};

export default PunchOutButton;