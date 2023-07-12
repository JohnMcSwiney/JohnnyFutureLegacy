import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import userData from '../signIn/users.json';
import './style.css';

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate()

  const handleSignUp = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
  
    const userExists = userData.some((user) => user.email === email);
  
    if (userExists) {
      setErrorMessage('User already exists. Please choose a different email.');
      return;
    }
    // Generate a new unique ID for the user
    const newUserId = userData.length + 1;

    // Create a new user object
    const newUser = {
      id: newUserId,
      email: email,
      password: password
    };

    // Add the new user to the user data
    userData.push(newUser);

    // Redirect to another page after successful signup
    navigate(`/`);
  };
  const validatePassword = (password) => {
    // Validate password using regular expression
    const passwordPattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{10,}$/;
    return passwordPattern.test(password);
  };

  return (
    <div className="signup--page--cont">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account? <a href="/signin">Sign In</a>
      </p>
    </div>
  );
}
