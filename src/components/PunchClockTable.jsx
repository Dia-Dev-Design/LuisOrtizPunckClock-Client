import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import axios from 'axios';
import { DateTime } from 'luxon';
import { SERVER_URL } from '../services/SERVER_URL';

const PunchClockTable = ({ refreshTable, setIsPunchOutEnabled }) => {
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
        let userRecords = response.data.filter((record) => {
          return user._id.toString() == record.user._id.toString()
        })

        console.log("These are user records...", userRecords)

        let finalRecord = [...userRecords][userRecords.length - 1]

        console.log("This is the final record ======>", finalRecord)

        if (finalRecord.punchOut === '') {
            setIsPunchOutEnabled(true)
        }
      })
      .catch((error) => console.log(error));
  };

  const returnTimeWorked = (timeIn, timeOut) => {
    let hoursWorked = DateTime.fromISO(timeOut).diff(DateTime.fromISO(timeIn), ["days", "hours", "minutes", "seconds"])
    console.log("These are hours worked right here", hoursWorked)      
    return (hoursWorked.values.days ? `${hoursWorked.values.days} days` : "") + (hoursWorked.values.hours ? `${hoursWorked.values.hours} hours` : "") + (hoursWorked.values.minutes ? `${hoursWorked.values.minutes} minutes` : "") + (hoursWorked.values.seconds ? `${hoursWorked.values.seconds} seconds` : "") 
  };

  useEffect(() => {
    fetchPunchData();
  }, [refreshTable]);

  useEffect(() => {
    const filtered = punchData.filter(record => {
      const fullNameMatch = record.user.username.toLowerCase().includes(searchName.toLowerCase());
      const punchInDate = DateTime.fromISO(record.punchIn);
      const yearMatch = searchYear ? punchInDate.year === parseInt(searchYear, 10) : true;
      const monthMatch = searchMonth ? punchInDate.month === parseInt(searchMonth, 10) : true;

      return fullNameMatch && yearMatch && monthMatch;
    });

    setFilteredData(filtered);
  }, [searchName, searchYear, searchMonth, punchData]);


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