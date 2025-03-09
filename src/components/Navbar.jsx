import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';

const Navbar = () => {
  const { logOutUser, getToken, getUsername } = useContext(AuthContext);
  const user = getUsername();
  console.log("this is the user ->", user);

  return (
    <nav className='navbar'>
        {
            !getToken() &&
            <>
                <h3>Welcome to PunchClock!</h3>
            </>
        }
        {
            getToken() &&
            <>
                <h3>Welcome, {user || 'User'}!</h3>
                <button onClick={logOutUser}>Logout</button>
            </>
        }
    </nav>
  );
};

export default Navbar;