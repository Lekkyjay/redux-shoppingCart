import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import UserContext from '../context/UserContext';

const AuthNavs = () => {
  const { authUser, setAuthUser } = useContext(UserContext);
  const history = useHistory()

  const login = () => history.push('/login')
  const admin = () => history.push('/admin')

  const logout = () => {
    localStorage.setItem('shopping-user', '')
    setAuthUser('');
    history.push('/')
  };

  return (
    <nav>
      {authUser ? (
        <div>
          <button onClick={logout}>Logout</button>
          <button onClick={admin}>Admin</button>
        </div>
      ) : (
        <div>
          <button onClick={login}>Login</button>
        </div>
      )}
    </nav>
  )
}

export default AuthNavs
