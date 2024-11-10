import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import TaskList from './components/TaskList';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track authentication status
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is authenticated by checking the token or user info in localStorage
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true); // Set authentication status if token exists
    }
  }, []);

  return (
    <Routes>
      {/* Login Page */}
      <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />

      {/* Signup Page */}
      <Route path="/signup" element={<Signup />} />

      {/* Task List Page (accessible only if logged in) */}
      <Route
        path="/"
        element={isAuthenticated ? <TaskList /> : <Login setIsAuthenticated={setIsAuthenticated} />}
      />
    </Routes>
  );
};

export default App;
