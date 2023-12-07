import React from 'react'
import './_PitchStyle.css'
import Splitter from '../../../components/splitter/Splitter';

function Pitch3_Trust() {
  let Pitch3Img = 'https://www.artic.edu/iiif/2/2a545c3c-c828-3991-d937-3eaa184621db/full/843,/0/default.jpg';
  return (
    <div className='pitch--container'>
      <div className='pitch--3--cont'>
        <Splitter />
        <h1>Built On Trust</h1>
        <br/>
        <div className='pitch--3--content'>
          
        <div className='pitch--1--img--cont'>
          <img src={Pitch3Img} />
          <h3>New Year's Eve Gathering - South Shore, Chicago, 1988</h3>
          <p>Kerry Stuart Coppin Archive</p>
          <p>Art Institute of Chicago</p>
        </div>
          
          <div className='pitch--3--talking--points'>
            <p><strong>Insitiutional Integrity</strong> - We work with established institutions to ensure the authenticity of their collections, connect with new audiences, and generate revenue.</p>
            <p><strong>Authorship</strong> - All individual creators are vetted for trustworthiness.</p>
            <p><strong>Community Accountability</strong> - Future Legacy’s core value is authenticity – we will do everything in our power to uphold this.</p>
            <p><strong>Proprietary Tech </strong> - Blockchain technology ensures instant, transparent transactions, ensuring economic viability.
</p>
          
          </div>
        </div>
      </div>


    </div>
  )
}

export default Pitch3_Trust