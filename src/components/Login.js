import React, { useContext, useState } from 'react'
import Axios from "axios";
import { useHistory } from 'react-router-dom';
import UserContext from '../context/UserContext';

const Login = () => {

  const { setAuthUser } = useContext(UserContext);
    
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()
    
  const loginUser = () => {
    Axios({
      method: "POST",
      data: { email, password},
      withCredentials: true,
      url: "http://localhost:4000/login",
    }).then((res) => {
      localStorage.setItem('shopping-user', res.data.user)
      setAuthUser(localStorage.getItem('shopping-user'))
      history.push('/')
    })
  };

  const register = () => history.push('/register')

  return (
    <div className="login">
      <h1>Login</h1>
      <input placeholder="email" onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="password" onChange={(e) => setPassword(e.target.value)} />
      <div className="login-register">
        <button onClick={loginUser}>Login</button>
        <span>/</span>
        <button onClick={register}>Register</button>
      </div>
    </div>
  )
}

export default Login
