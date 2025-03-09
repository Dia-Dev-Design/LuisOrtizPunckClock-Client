import { useState, useEffect } from 'react';
import Time from "../components/Time";
import PunchInButton from "../components/PunchInButton";
import PunchOutButton from "../components/PunchOutButton";
import PunchClockTable from '../components/PunchClockTable';
// import Clock from '../components/Clock';

const PunchClockPage = () => {
  const [punchInId, setPunchInId] = useState(null);
  const [isPunchInEnabled, setIsPunchInEnabled] = useState(true);
  const [isPunchOutEnabled, setIsPunchOutEnabled] = useState(false);
  const [refreshTable, setRefreshTable] = useState(false);

  const handlePunchIn = (id) => {
    setPunchInId(id);
    setIsPunchInEnabled(false); // Disable Punch In button
    setIsPunchOutEnabled(true); // Enable Punch Out button
  };

  const handlePunchOut = () => {
    setPunchInId(null); // Clear punch-in ID
    setIsPunchInEnabled(true); // Enable Punch In button
    setIsPunchOutEnabled(false); // Disable Punch Out button
  };

  // Auto-refresh table every 5 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      setRefreshTable(prev => !prev); // Toggle refreshTable state to trigger re-render in PunchClockTable
    }, 5000); // 5000 ms = 5 seconds

    return () => clearInterval(intervalId); // Clear interval on component unmount
  }, []);

  return (
    <div>
      <h1>Punch Clock Page</h1>
      
      {/* <div className='clockContainer'>
        <Clock />
      </div> */}

      <Time />

      <div className='buttonRow'>
        <PunchInButton onPunchIn={handlePunchIn} isDisabled={!isPunchInEnabled} />
        
        <PunchOutButton punchInId={punchInId} onPunchOut={handlePunchOut} isDisabled={!isPunchOutEnabled} />
      </div>

      <div>
        <PunchClockTable refreshTable={refreshTable} />
      </div>
    </div>
  );
}

export default PunchClockPage;