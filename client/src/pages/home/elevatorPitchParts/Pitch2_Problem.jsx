import React from 'react'
import './_PitchStyle.css'
import Splitter from '../../../components/splitter/Splitter'

function Pitch2_Problem() {
  return (
    <div className='pitch--container'>
      <div className='pitch--2--cont'>
      <Splitter/>
      <h1 className='tracking-in-contract-bck'>The Problem</h1>
      <div className='pitch--2--content'>
        <div className='pitch--2--problem'>
          <h1>LOCKED OUT</h1>
          <p>The majority of the world’s vital cultural assets - starting with photography - sit untapped in archives, their immense value locked away from the public.</p>
        </div>

        <div className='pitch--2--problem'>
          <h1>DISCARDED</h1>
          
          <p>Global monopolies dominate cultural markets extracting maximum profits while strictly controlling access – leaving assets deemed ‘unprofitable’ ignored, shuttered, or trashed. </p>
        </div>

        <div className='pitch--2--problem'>
          <h1>A LOOMING THREAT</h1>
          <p>These forces, along with the rapid evolution of AI, threaten our collective trust in the world’s most valuable commodity – <strong>our human story.</strong></p>
          
        </div>
      </div>
      </div>

      </div>
  )
}

export default Pitch2_Problem