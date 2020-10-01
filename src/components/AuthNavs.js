import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import UserContext from '../context/UserContext';

const AuthNavs = () => {
  const { authUser, setAuthUser } = useContext(UserContext);
  const history = useHistory()

  const login = () => history.push('/login')
  const register = () => history.push('/register')

  const logout = () => {
    localStorage.setItem('shopping-user', '')
    setAuthUser('');
    history.push('/')
  };

  return (
    <nav>
      {authUser ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <div>
          <button onClick={login}>Login</button>
          <button onClick={register}>Register</button>
        </div>
      )}
    </nav>
  )
}

export default AuthNavs
