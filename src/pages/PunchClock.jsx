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
    <div className="min-h-screen bg-marshmallow bg-absolute-light pt-24 pb-8 px-6 force-light-mode">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-aquaGreen text-absolute-aqua mb-4">
            Punch Clock
          </h1>
          <p className="text-lg text-gray-600 text-absolute-gray">
            Track your work hours with ease
          </p>
        </div>

        {/* Time Display Card */}
        <div className="bg-white bg-absolute-white rounded-2xl shadow-xl p-8 mb-8 text-center border border-gray-100 border-absolute-gray">
          <h2 className="text-xl font-semibold text-gray-700 text-absolute-gray mb-4">Current Time</h2>
          <Time />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
          <PunchInButton 
            onPunchIn={handlePunchIn} 
            isDisabled={!isPunchInEnabled} 
          />
          
          <PunchOutButton 
            punchInId={punchInId} 
            onPunchOut={handlePunchOut} 
            setIsPunchOutEnabled={setIsPunchOutEnabled} 
            isDisabled={isPunchOutEnabled} 
          />
        </div>

        {/* Time Tracking Table */}
        <div className="bg-white bg-absolute-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 border-absolute-gray">
          <div className="bg-aquaGreen bg-absolute-aqua text-white text-absolute-white px-6 py-4">
            <h3 className="text-xl font-semibold">Time Records</h3>
            <p className="text-mint text-absolute-mint text-sm opacity-90">
              Your recent punch clock entries
            </p>
          </div>
          
          <div className="p-6">
            <PunchClockTable 
              refreshTable={refreshTable} 
              setIsPunchOutEnabled={setIsPunchOutEnabled} 
              setPunchInId={setPunchInId} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PunchClockPage;