import React, { useContext, useState } from 'react'
import Axios from "axios";
import { useHistory } from 'react-router-dom';
import UserContext from '../context/UserContext';

const Register = () => {
  const { setAuthUser } = useContext(UserContext);
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const history = useHistory()
    
  const registerUser = () => {
    Axios({
      method: "POST",
      data: { email, password},
      withCredentials: true,
      url: "http://localhost:4000/register",
    }).then((res) => {
      history.push('/')
    })
  };

  const login = () => history.push('/login')

  return (
    <div className="register">
      <h1>Register</h1>
      <input placeholder="email" onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="password" onChange={(e) => setPassword(e.target.value)} />
      <div className="login-register">
        <button onClick={registerUser}>Register</button>
        <span>/</span>
        <button onClick={login}>Login</button>
      </div>
    </div>
  )
}

export default Register
