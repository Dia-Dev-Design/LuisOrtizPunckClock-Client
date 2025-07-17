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
    <div>
      <h1 className="text-3xl font-bold text-aquaGreen mb-8 text-center">Welcome Back!</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input 
            name='email' 
            type='email' 
            value={user.email} 
            onChange={handleTextInput}
            className="w-full px-3 py-3 border-b-2 border-gray-300 focus:border-mint focus:outline-none transition-colors text-gray-900"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <input 
            name='password' 
            type='password' 
            value={user.password} 
            onChange={handleTextInput}
            className="w-full px-3 py-3 border-b-2 border-gray-300 focus:border-mint focus:outline-none transition-colors text-gray-900"
            placeholder="Enter your password"
          />
        </div>

        <div className="text-right">
          <a href="#" className="text-sm text-skyBlue hover:text-mint transition-colors">
            Forgot password?
          </a>
        </div>

        <button 
          type='submit'
          className="w-full py-3 bg-mint text-aquaGreen font-bold text-lg rounded-lg hover:bg-skyBlue hover:text-white transition-colors shadow-md"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;