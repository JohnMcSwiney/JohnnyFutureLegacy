import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './style.css';

import { StyledContainer, StyledTitle, StyledSubTitle, Avatar, StyledButton } from '../../../../components/Styles'
import AppContentWrapper from '../../../../components/containers/AppContentWrapper';
import PageContainer from '../../../../components/containers/PageContainer';
import PageTitle from '../../../../components/containers/PageTitle';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    // Here you would typically make a request to your backend for authentication
    // For now, let's simulate a simple authentication with a hardcoded email and password
    if (email === 'testuser@example.com' && password === 'testpassword') {
      // Successful login - you can redirect or set some state indicating the user is logged in
      setError('');
      console.log('Login successful!');
    } else {
      setError('Invalid email or password.');
    }
  };


  return (
    <AppContentWrapper>
      <PageContainer>

        <PageTitle>
          <h2>Login</h2>
        </PageTitle>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleLogin}>
        <label>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
          <br />
          <label>
            Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <br />
          <button type="submit">Login</button>
        </form>
      </PageContainer>
    </AppContentWrapper>
    // <StyledContainer>
    //   <StyledTitle size={95}>

    //   </StyledTitle>

    // </StyledContainer>


    // <div>
    //    Test
    //    {(typeof backendData.users === 'undefined') ? (
    //     <p>loading</p>
    //    ) : (
    //     backendData.users.map((user, i) => (
    //      <p key={i}>{user}</p> 
    //     ))
    //    )}
    // </div>
  );
}

