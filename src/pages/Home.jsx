import { useState } from 'react';
import LoginForm from "../components/LoginForm";
import SignupForm from '../components/SignupForm';

const Home = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };


  return (
    <div className='HomePage'>
      <h1>Dia Dev Clock In</h1>  

      <div>
        <label htmlFor="toggle-details">Login</label>
        <label className="toggle">
          <input type="checkbox" id="toggle-details" checked={isChecked} onChange={handleCheckboxChange} />
          <span className="slider"></span>
        </label>
        <label htmlFor="toggle-details">Signup</label>
      </div>

      {!isChecked && 
        <LoginForm />
      }

      {isChecked && 
        <SignupForm />
      }

    </div>
  );
};

export default Home;