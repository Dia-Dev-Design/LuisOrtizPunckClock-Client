import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { post } from '../services/authService';
import { AuthContext } from '../context/auth.context';

const LoginForm = () => {
  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();
  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleTextInput = (e) => {
    setUser((prev) => ({...prev, [e.target.name]: e.target.value}));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    post('/auth/login', user)
      .then((response) => {
        storeToken(response.data.authToken);
        authenticateUser();
        navigate('/punchclock');
      })
      .catch((error) => {
        console.log(error);
      })
  };

  return (
    <div className="force-light-mode">
      <h1 className="text-3xl font-bold text-aquaGreen text-absolute-aqua mb-8 text-center">Welcome Back!</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 text-absolute-gray mb-2">
            Email
          </label>
          <input 
            name='email' 
            type='email' 
            value={user.email} 
            onChange={handleTextInput}
            className="w-full px-4 py-3 border-2 border-gray-200 border-absolute-gray rounded-lg focus:border-mint focus:border-absolute-mint focus:outline-none focus:ring-2 focus:ring-mint/20 transition-all duration-200 text-gray-900 text-absolute-black bg-white bg-absolute-white hover:border-mint/50 hover:shadow-sm"
            placeholder="Enter your email"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 text-absolute-gray mb-2">
            Password
          </label>
          <input 
            name='password' 
            type='password' 
            value={user.password} 
            onChange={handleTextInput}
            className="w-full px-4 py-3 border-2 border-gray-200 border-absolute-gray rounded-lg focus:border-mint focus:border-absolute-mint focus:outline-none focus:ring-2 focus:ring-mint/20 transition-all duration-200 text-gray-900 text-absolute-black bg-white bg-absolute-white hover:border-mint/50 hover:shadow-sm"
            placeholder="Enter your password"
            required
            minLength={6}
          />
        </div>

        <div className="text-right">
          <a 
            href="#" 
            className="text-sm text-skyBlue text-absolute-sky hover:text-mint hover:text-absolute-mint transition-colors duration-200 underline-offset-4 hover:underline"
          >
            Forgot password?
          </a>
        </div>

        <button 
          type='submit'
          className="w-full py-3 bg-mint bg-absolute-mint text-aquaGreen text-absolute-dark-green font-bold text-lg rounded-lg hover:bg-skyBlue hover:bg-absolute-sky hover:text-white hover:text-absolute-white transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transform"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;