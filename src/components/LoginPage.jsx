import React, { useState } from 'react';
import axios from 'axios';
import { saveToken } from '../auth';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    axios.post('http://127.0.0.1:8000/api/login', { email, password })
      .then(res => {
        saveToken(res.data.access_token); // Save token
        navigate('/dashboard'); // Redirect after login
      })
      .catch(() => alert('Login failed'));
  };

  return (
    <div className="container mt-5">
      <h3>Login</h3>
      <form onSubmit={handleLogin}>
        <input type="email" className="form-control mb-2" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" className="form-control mb-2" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="btn btn-primary">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
