import { useState, useEffect } from 'react';
import { DateTime } from 'luxon';

function Time() {
  const [time, setTime] = useState(DateTime.now().toLocaleString(DateTime.DATETIME_MED_WITH_SECONDS));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(DateTime.now().toLocaleString(DateTime.DATETIME_MED_WITH_SECONDS));
    }, 1000);

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);

  return <div>{time}</div>;
}

export default Time;