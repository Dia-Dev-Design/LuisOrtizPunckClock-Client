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
    <div className='card signupPage'>
      <h1>Signup</h1>

      <form onSubmit={handleSubmit}>
        <label>
          Fullname
          <input name='username' type='text' value={newUser.username} onChange={handleTextInput} />
        </label>

        <br />

        <label>
          Email
          <input name='email' type='email' value={newUser.email} onChange={handleTextInput} />
        </label>

        <br />

        <label>
          Password
          <input name='password' type='password' value={newUser.password} onChange={handleTextInput} />
        </label>

        <br />

        <button type='submit'>Signup</button>
      </form>
    </div>
  );
};

export default SignupForm;