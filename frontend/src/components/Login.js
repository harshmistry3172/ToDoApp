import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Automatically reload the page if user is already authenticated
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
      navigate('/'); // Redirect to home or task list if authenticated
    }
  }, [navigate, setIsAuthenticated]);

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('https://todoapp-7zyq4d4s.b4a.run/api/users/login', { email, password });
      console.log(response.data);
      
      // On successful login, save token and set authenticated state
      localStorage.setItem('authToken', response.data.token);
      setIsAuthenticated(true); // Set authentication to true
      navigate('/'); // Redirect to TaskList
    } catch (error) {
      console.error(error);
      alert('Login failed, please try again.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '2rem auto', padding: '2rem', backgroundColor: '#f9f9f9', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ fontSize: '24px', color: '#333', textAlign: 'center', marginBottom: '1.5rem' }}>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: '100%', padding: '10px', fontSize: '16px', marginBottom: '1rem', border: '1px solid #ccc', borderRadius: '5px', boxSizing: 'border-box' }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: '100%', padding: '10px', fontSize: '16px', marginBottom: '1rem', border: '1px solid #ccc', borderRadius: '5px', boxSizing: 'border-box' }}
        />
        <button
          type="submit"
          style={{
            width: '100%',
            padding: '12px',
            fontSize: '16px',
            color: '#fff',
            backgroundColor: '#007bff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
          }}
        >
          Login
        </button>
      </form>
      <p style={{ textAlign: 'center', marginTop: '1rem' }}>
        Don't have an account? <a href="/signup" style={{ color: '#007bff' }}>Sign Up</a>
      </p>
    </div>
  );
};

export default Login;
