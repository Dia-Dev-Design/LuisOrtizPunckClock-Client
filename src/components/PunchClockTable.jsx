import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import axios from 'axios';
import { DateTime } from 'luxon';
import { SERVER_URL } from '../services/SERVER_URL';

const PunchClockTable = ({ isPunchInEnabled, isPunchOutEnabled }) => {
  const [punchData, setPunchData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [searchYear, setSearchYear] = useState('');
  const [searchMonth, setSearchMonth] = useState('');

  const { user } = useContext(AuthContext)

  const fetchPunchData = () => {
    axios
      .get(`${SERVER_URL}/punchclock`)
      .then((response) => {
        setPunchData(response.data);
        setFilteredData(response.data);
      })
      .catch((error) => console.log(error));
  };


  const returnTimeWorked = (timeIn, timeOut) => {
    // let hoursWorked = DateTime.fromISO(timeOut).diff(DateTime.fromISO(timeIn), {string: ["years", "months", "weeks", "days", "hours", "minutes", "seconds"]})
    // console.log("These are hours worked right here", hoursWorked)      
    return 'hi'
  };

  // const returnTimeWorked = (timeIn, timeOut) => {
  //   let hoursWorked = DateTime.fromISO(timeOut).diff(DateTime.fromISO(timeIn), {string: ["years", "months", "weeks", "days", "hours", "minutes", "seconds"]})
  //   console.log("These are hours worked right here", hoursWorked)      
  //   return hoursWorked
  // };

  // Fetch data on initial load and whenever refreshTable changes
  useEffect(() => {
    fetchPunchData();
  }, [isPunchInEnabled, isPunchOutEnabled]);


  return (
    <div>
      <h2>Punch Clock Records</h2>

      <div className="search-boxes">
        <input
          type="text"
          className="input-search"
          placeholder="Search by Full Name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <input
          type="number"
          className="input-search"
          placeholder="Search by Year"
          min="0"
          value={searchYear}
          onChange={(e) => setSearchYear(e.target.value)}
        />
        <input
          type="number"
          className="input-search"
          placeholder="Search by Month (1-12)"
          min="1"
          max="12"
          value={searchMonth}
          onChange={(e) => setSearchMonth(e.target.value)}
        />
      </div>

      <br />

      <table>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Punch In Time</th>
            <th>Punch Out Time</th>
            <th>Time worked</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((record) => (
            <tr key={record._id}>
              <td>{record.user.username}</td>
              <td>{record.punchIn ? DateTime.fromISO(record.punchIn).toLocaleString(DateTime.DATETIME_SHORT) : 'N/A'}</td>
              <td>{record.punchOut ? DateTime.fromISO(record.punchOut).toLocaleString(DateTime.DATETIME_SHORT) : 'N/A'}</td>
              <td>{record.punchOut ? returnTimeWorked(record.punchIn, record.punchOut) : 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PunchClockTable;