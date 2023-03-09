// frontend/src/auth.js
export const register = async (user) => {
    await fetch('http://localhost:5000/register', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: { 'Content-Type': 'application/json' },
    });
  };
  
  export const login = async (credentials) => {
    const response = await fetch('http://localhost:5000/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();
    localStorage.setItem('token', data.token);
  };
  
  // frontend/src/Login.js
  import React, { useState } from 'react';
  import { login } from './auth';
  
  function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      await login({ email, password });
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        <button type="submit">Login</button>
      </form>
    );
  }
  
  export default Login;
  