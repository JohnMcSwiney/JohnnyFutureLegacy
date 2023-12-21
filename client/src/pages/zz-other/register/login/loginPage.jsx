import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

import { StyledContainer, StyledTitle, StyledSubTitle, Avatar, StyledButton } from '../../../../components/Styles'
import AppContentWrapper from '../../../../components/containers/AppContentWrapper';
import PageContainer from '../../../../components/containers/PageContainer';
import PageTitle from '../../../../components/containers/PageTitle';
import { useMyContext } from '../../../../context/FLContext';

import API_BASE_URL from '../../../../apiConfig';

export default function LoginPage() {
  const navigate = useNavigate();
  const redirectAccount = () => { navigate(`/profile`); };
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const {currentUserId,
      setCurrentUserId,
      currentUserObject,
      setCurrentUserObject} = useMyContext();
  const handleLogin = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setError('');
        console.log(data.message);
        console.log(data.userId);
        setCurrentUserId(data.userId)
        redirectAccount();
        // Handle successful login (e.g., redirect to another page)
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Error during login');
      }
    } catch (error) {
      setError('Error during login');
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

