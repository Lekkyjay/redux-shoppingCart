import React, { useState } from 'react'

const [email, setEmail] = useState('')
const [password, setPassword] = useState('')

const Login = () => {
  
  const loginUser = () => {
    Axios({
      method: "POST",
      data: { email, password},
      withCredentials: true,
      url: "http://localhost:5000/login",
    }).then((res) => console.log(res));
  };

  return (
    <div className="login">
      <h1>Login</h1>
      <input placeholder="username" onChange={(e) => setEmail(e.target.value)} />
      <input placeholder="password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={loginUser}>Login</button>
    </div>
  )
}

export default Login
