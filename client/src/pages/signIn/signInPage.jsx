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


  const SignupForm = () => {
    const [formData, setFormData] = useState({
      username: '',
      email: '',
      password: '',
    });
  
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      // Convert form data to JSON string
      const jsonData = JSON.stringify(formData, null, 2);
  
      // Create a Blob from the JSON string
      const blob = new Blob([jsonData], { type: 'application/json' });
  
      // Generate a temporary URL for the blob
      const url = URL.createObjectURL(blob);
  
      // Create a temporary <a> element and trigger the download
      const link = document.createElement('a');
      link.href = url;
      link.download = 'account.json';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    };

  return (
    <div>
       <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Submit</button>
    </form>
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
}
