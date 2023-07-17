import styled from 'styled-components'

import {Link} from 'react-router-dom';


export const colors = {
  bg: '#ffffff',
  font: '#000000',
  primary: '#48acf0',
  secondary: '#594236',
  tertiary: '#cd1c10',
  highlight1: '#93a3bc'
}

export const StyledContainer = styled.div`
  margin: 0;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: #ffffff;
  background-size: cover;
  background-attachment: fixed;
`

export const StyledTitle = styled.h2`
  font-size: ${props => props.size}px;
  text-align: center;
  color: ${props => (props.color ? props.color : colors.primary)};
  padding: 5px;
  margin-bottom: 20px;
`

export const StyledSubTitle = styled.p`
  font-size: ${props => props.size}px;
  text-align: center;
  color: ${props => (props.color ? props.color : colors.secondary)};
  padding: 5px;
  margin-bottom: 25px;
`

export const Avatar = styled.div`
width: 85px;
height: 85px;
border-radius: 20px;
background-image: url(${props => props.image});
background-position: center;
margin: auto;
`

export const StyledButton = styled(Link)`
background-color: rgb(27, 27, 27);
    border: none;
    color: white;
    width: 300px;
    height: 50px;
    border-radius: 50px;
    font-family: var(--font--fam);
    font-size: 20px;
    font-weight: 300;
    margin-top: 20px;
    transition: box-shadow 0.3s ease, text-shadow 0.3s ease, scale 0.3s ease;

    &:hover{
        transform: scale(1.01); /* Increase the scale on hover */
        box-shadow: rgba(84, 84, 84, 0.845) 0px 1px 2px;
        text-shadow: rgba(212, 210, 210, 0.533) 0px 1px 2px;
    }
`

export const ButtonGroup = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin: 0;
    flex-direction: row;
`;

export const StyledTextInput = styled.input`
padding: 5px;
width: 80vw;
max-width: 1000px;
height: 40px;
border-radius: 1000px;
border: 2px solid black;
font-size: 20px;
padding-left: 20px;
`;