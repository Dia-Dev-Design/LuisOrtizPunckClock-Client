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

  return (
    <div className="text-center force-light-mode">
      <div className="text-3xl font-bold text-aquaGreen text-absolute-aqua mb-2 font-mono">
        {time}
      </div>
      <div className="text-sm text-gray-500 text-absolute-gray">
        Live updates every second
      </div>
    </div>
  );
}

export default Time;