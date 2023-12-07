import React, {useEffect, useState} from 'react'
import './_PitchStyle.css'
import Splitter from '../../../components/splitter/Splitter'

function Pitch1_Logo() {
  function getRandomTitle(originalTitle, alternativeTitle) {
    // Generate a random number between 0 and 1
    const randomValue = Math.random();
  
    // Check if the random value is less than 0.5 (50% chance)
    if (randomValue < 0.5) {
      // Show the original title
      return originalTitle;
    } else {
      // Show the alternative title
      return alternativeTitle;
    }
  }
  
  // Example usage
  const originalTitle = "Unlocking Culture You Can Trust";
  const alternativeTitle = "Saving Our Human Story";
  
  const [title, setTitle] = useState('');


  useEffect(()=>{
setTitle(getRandomTitle(originalTitle, alternativeTitle));
  },[])
  return (
    <div className='pitch--container'>
      <div className='pitch--1--cont'>
        <div className='pitch--logo--cont fade-in'>
        <img src="https://firebasestorage.googleapis.com/v0/b/futurelegacy-test.appspot.com/o/FL_Assets%2FFL_logo_white.png?alt=media&token=e23d1965-e13f-4594-babb-9937afc3707e"/>
        </div>
        <br/>
        <h1 className='tracking-in-contract-bck'>{title}</h1>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        
        <Splitter/>
        <br/>
        <div className='pitch--1--content'>
        <p>FUTURE <span>LEGACY</span> connects, authenticates, and distributes the world’s vital cultural assets in one searchable decentralized platform.</p>
        
        <div className='pitch--1--img--cont'>
          <img src='https://i.natgeofe.com/n/b4a2a258-8d34-47c5-bfbb-c63d1f6bffdf/NationalGeographic_2355333.png?w=1084.125&h=721.875'/>
          <h3>Mohanis Fishermen in the Indus River</h3>
          <p>Randy Olson National Geographic</p>
          <p>The Photo Society</p>
        </div>
        
        </div>
        <br/>
      </div>
      </div>
  )
}

export default Pitch1_Logo