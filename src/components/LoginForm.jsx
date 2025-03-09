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
    <div className='card loginPage'>
      <h1>Login</h1>

      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input name='email' type='email' value={user.email} onChange={handleTextInput} />
        </label>

        <br />

        <label>
          Password
          <input name='password' type='password' value={user.password} onChange={handleTextInput} />
        </label>

        <br />

        <button type='submit'>Login</button>
      </form>
    </div>
  );
};

export default LoginForm;