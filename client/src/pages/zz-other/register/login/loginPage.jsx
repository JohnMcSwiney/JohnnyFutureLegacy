import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import usersData from './users.json';
import * as Yup from 'yup';

import {StyledContainer, StyledTitle, StyledSubTitle, Avatar, StyledButton} from '../../../../components/Styles'
// import

export default function LoginPage() {
  const logoUrl = 'https://firebasestorage.googleapis.com/v0/b/futurelegacy-test.appspot.com/o/FL_Assets%2FGroup%201253.png?alt=media&token=d96e2f7e-960b-457d-bb26-a92735380d4d';
    // backend testing
    const [backendData, setBackendData] = useState([{}])
    useEffect(() => {
      fetch("/api").then(
        response => response.json()
      ).then(
        data => {
          setBackendData(data)
        }
      )
      // console.log(backendData)
    },[])


  return (
    <StyledContainer>
      <StyledTitle size={95}>
        Login
      </StyledTitle>
     
    </StyledContainer>
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

