import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    console.log(email, password);
    
    try {
      const response = await axios.post('http://localhost:5000/api/users/signup', { email, password });
      console.log('Signup successful:', response);
      navigate('/login'); // Redirect to login after successful signup
    } catch (error) {
      console.error(error);
      alert('Signup failed, please try again.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '2rem auto', padding: '2rem', backgroundColor: '#f9f9f9', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ fontSize: '24px', color: '#333', textAlign: 'center', marginBottom: '1.5rem' }}>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: '100%', padding: '12px', fontSize: '16px', marginBottom: '1.5rem', border: '1px solid #ccc', borderRadius: '5px', boxSizing: 'border-box' }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: '100%', padding: '12px', fontSize: '16px', marginBottom: '1.5rem', border: '1px solid #ccc', borderRadius: '5px', boxSizing: 'border-box' }}
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
          Sign Up
        </button>
      </form>
      <p style={{ textAlign: 'center', marginTop: '1rem' }}>
        Already have an account? <a href="/login" style={{ color: '#007bff' }}>Login</a>
      </p>
    </div>
  );
};

export default Signup;
