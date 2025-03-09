import './App.css'
import { useContext } from 'react';
import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { AuthContext } from './context/auth.context';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import PunchClock from './pages/PunchClock';

function App() {
  const { getToken } = useContext(AuthContext);

  const IsLoggedIn = () => {
    return getToken() ? <Outlet /> : <Navigate to='/punchclock' />;
  };

  const IsLoggedOut = () => {
    return !getToken() ? <Outlet /> : <Navigate to='/' />;
  }

  return (
    <div className='App'>
      <Navbar />

      <Routes>
        <Route element={<IsLoggedOut />}>
          <Route path='/' element={<Home />} />
        </Route>

        <Route element={<IsLoggedIn/>}>
          <Route path='/punchclock' element={<PunchClock />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;