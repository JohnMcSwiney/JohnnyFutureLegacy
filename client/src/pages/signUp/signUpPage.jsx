import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import userData from '../signIn/users.json';
import './style.css';
 

const SignupPage = () => {
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
    link.download = '../signin/users.json';
    document.body.appendChild(link);
    link.click();
    // document.body.removeChild(link);
    URL.revokeObjectURL(url);
    console.log( jsonData);
  };

  return (
    <div>
      {/* Your existing signup page content */}
      <h1>Signup Page</h1>
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
    </div>
  );
};

export default SignupPage;
