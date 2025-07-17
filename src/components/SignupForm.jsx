import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { post } from '../services/authService';
import { AuthContext } from '../context/auth.context';

const SignupForm = () => {
  const [newUser, setNewUser]= useState({
    username: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();
  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleTextInput = (e) => {
    setNewUser((prev) => ({...prev, [e.target.name]: e.target.value}));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    post('/auth/signup', newUser)
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
      <h1 className="text-3xl font-bold text-aquaGreen mb-8 text-center">Create Account</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name
          </label>
          <input 
            name='username' 
            type='text' 
            value={newUser.username} 
            onChange={handleTextInput}
            className="w-full px-3 py-3 border-b-2 border-gray-300 focus:border-mint focus:outline-none transition-colors text-gray-900"
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input 
            name='email' 
            type='email' 
            value={newUser.email} 
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
            value={newUser.password} 
            onChange={handleTextInput}
            className="w-full px-3 py-3 border-b-2 border-gray-300 focus:border-mint focus:outline-none transition-colors text-gray-900"
            placeholder="Create a password"
          />
        </div>

        <button 
          type='submit'
          className="w-full py-3 bg-mint text-aquaGreen font-bold text-lg rounded-lg hover:bg-skyBlue hover:text-white transition-colors shadow-md"
        >
          Create Account
        </button>
      </form>
    </div>
  );
};

export default SignupForm;