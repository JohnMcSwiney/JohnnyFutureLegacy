import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import usersData from './users.json';
import * as Yup from 'yup';

import {StyledContainer} from '../../components/Styles'


export default function SignInPage() {
  
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
      <p> hello world</p>
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

