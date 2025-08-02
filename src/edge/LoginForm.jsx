import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { post } from '../services/authService';
import { AuthContext } from '../context/auth.context';

const EdgeLoginForm = () => {
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
      <h1 className="text-3xl font-bold mb-8 text-center" 
          style={{ 
            color: '#48D994'
          }}>
        Welcome Back!
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#ffffff' }}>
            Email
          </label>
          <input 
            name='email' 
            type='email' 
            value={user.email} 
            onChange={handleTextInput}
            className="w-full px-4 py-3 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2"
            style={{
              background: '#ffffff', // Clean white background
              border: '1px solid #d1d5db',
              color: '#1f2937', // Dark text for readability
              fontSize: '16px'
            }}
            placeholder="Enter your email"
            required
            onFocus={(e) => {
              e.target.style.borderColor = '#48D994';
              e.target.style.boxShadow = '0 0 0 2px rgba(72, 217, 148, 0.2)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#d1d5db';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" style={{ color: '#ffffff' }}>
            Password
          </label>
          <input 
            name='password' 
            type='password' 
            value={user.password} 
            onChange={handleTextInput}
            className="w-full px-4 py-3 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2"
            style={{
              background: '#ffffff', // Clean white background
              border: '1px solid #d1d5db',
              color: '#1f2937', // Dark text for readability
              fontSize: '16px'
            }}
            placeholder="Enter your password"
            required
            minLength={6}
            onFocus={(e) => {
              e.target.style.borderColor = '#48D994';
              e.target.style.boxShadow = '0 0 0 2px rgba(72, 217, 148, 0.2)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#d1d5db';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>

        <div className="text-right">
          <a 
            href="#" 
            className="text-sm transition-colors duration-200 hover:underline underline-offset-4"
            style={{ 
              color: '#77B9F3'
            }}
            onMouseEnter={(e) => e.target.style.color = '#48D994'}
            onMouseLeave={(e) => e.target.style.color = '#77B9F3'}
          >
            Forgot password?
          </a>
        </div>

        <button 
          type='submit'
          className="w-full py-3 rounded-lg font-bold text-lg transition-all duration-200 hover:scale-105 active:scale-95"
          style={{
            background: 'linear-gradient(45deg, #48D994, #2A6E6A)',
            color: '#ffffff',
            boxShadow: '0 5px 15px rgba(72, 217, 148, 0.3)',
            border: 'none'
          }}
          onMouseEnter={(e) => {
            e.target.style.boxShadow = '0 8px 25px rgba(72, 217, 148, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.target.style.boxShadow = '0 5px 15px rgba(72, 217, 148, 0.3)';
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default EdgeLoginForm; 