import '../App.css'
import { useContext } from 'react';
import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import Navbar from '../components/Navbar';
import Home from '../standard/Home';
import PunchClock from '../pages/PunchClock';

function StandardApp() {
  const { getToken } = useContext(AuthContext);

  const IsLoggedIn = () => {
    return getToken() ? <Outlet /> : <Navigate to='/' />;
  };

  return (
    <div className='App min-h-screen bg-marshmallow text-gray-900'>
      <Navbar />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route element={<IsLoggedIn/>}>
          <Route path='/punchclock' element={<PunchClock />} />
        </Route>
      </Routes>
    </div>
  );
}

export default StandardApp; 