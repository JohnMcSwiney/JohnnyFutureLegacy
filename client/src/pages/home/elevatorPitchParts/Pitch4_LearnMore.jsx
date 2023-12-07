import React from 'react'
import './_PitchStyle.css'
import Splitter from '../../../components/splitter/Splitter'
import { useNavigate } from 'react-router'

function Pitch4_LearnMore() {
  const navigate = useNavigate();
  const redirectAbout = () => {
    navigate(`/about`);

  };

  return (
    <div className='pitch--4--container'>
      <br/>
      <br/>
      <br/>
      <Splitter />
      <div className='pitch--4--content'>
        <h2>Learn more about us</h2>
        <button className='redirect--about--btn' onClick={redirectAbout}>Learn More</button>
      </div>
    </div>
  )
}

export default Pitch4_LearnMore