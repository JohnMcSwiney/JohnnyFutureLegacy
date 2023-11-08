import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
// import './style.css';
// import usersData from './users.json';
import * as Yup from 'yup'

import {
  StyledContainer,
  StyledTitle,
  StyledTitle2,
  StyledSubTitle,
  Avatar,
  StyledButton,
  ButtonGroup
} from '../../components/Styles'
// import

function landingPage () {
  const logoUrl =
    'https://firebasestorage.googleapis.com/v0/b/futurelegacy-test.appspot.com/o/FL_Assets%2FGroup%201253.png?alt=media&token=d96e2f7e-960b-457d-bb26-a92735380d4d'

  return (
    <StyledContainer>
      <div>
        <Avatar image={logoUrl} />
      </div>
      <StyledTitle size={95}>Future Legacy</StyledTitle>
      <StyledSubTitle size={27}>
        Presering the Past, Serving the Future
      </StyledSubTitle>
      <ButtonGroup>
        <StyledButton to='/login'>Login</StyledButton>
        <StyledButton to='/signup'>Signup</StyledButton>
      </ButtonGroup>
    </StyledContainer>
  )
}

export default landingPage
