import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import usersData from './users.json';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [error, setError] = useState('');
  const [showPasswordRequirements, setShowPasswordRequirements] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Simulating data fetching from JSON file
    setUsers(usersData);
  }, []);

  const handleSignIn = () => {
    // Reset error messages
    setEmailError('');
    setPasswordError('');
    setError('');

    // Validate email format
    if (!email) {
      setEmailError('Email is required');
      return;
    }

    if (!validateEmail(email)) {
      setEmailError('Invalid email format');
      return;
    }

    // Validate password format
    if (!password) {
      setPasswordError('Password is required');
      return;
    }

    if (!validatePassword(password)) {
      setPasswordError('Invalid password format');
      return;
    }

    // Find the user in the user list
    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      // User found, redirect to apply page
      window.location.href = '/apply';
    } else {
      // User not found or incorrect credentials
      setError('Invalid email or password');
    }
  };

  const validateEmail = (email) => {
    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    // Password requirements: at least 10 characters, at least one symbol and one number
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{10,}$/;
    return passwordRegex.test(password);
  };

  return (
    <div>
      <h1>Sign In</h1>
      <div>
        <label>Email:</label>
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {emailError && <div className="error">{emailError}</div>}
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {passwordError && <div className="error">{passwordError}</div>}
      </div>
      {error && <div className="error">{error}</div>}
      <button onClick={handleSignIn}>Sign In</button>
      <Link to="/signup">
        <button>Sign Up</button>
      </Link>
      <button onClick={() => setShowPasswordRequirements(true)}>
        Password Requirements
      </button>
      {/* {showPasswordRequirements && (
        <div className="password-requirements">
          <p>Password Requirements:</p>
          <ul>
            <li>Minimum 10 characters</li>
            <li>At least one symbol (!@#$%^&*)</li>
            <li>At least one number (0-9)</li>
          </ul>
          <button onClick={() => setShowPasswordRequirements(false)}>
            Close
          </button>
        </div>
      )} */}
    </div>
  );
}
