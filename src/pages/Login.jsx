import { useState } from 'react';
import LoginForm from "../components/LoginForm";
import SignupForm from '../components/SignupForm';

const Login = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  return (
    <div className='loginPage'>
      <input type="checkbox" id="toggle-details" checked={isChecked} onChange={handleCheckboxChange} />
      <label htmlFor="toggle-details">Login / Signup</label>

      {!isChecked && 
        <LoginForm />
      }

      {isChecked && 
        <SignupForm />
      }

    </div>
  );
};

export default Login;