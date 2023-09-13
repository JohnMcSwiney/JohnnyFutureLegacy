import React from 'react';

import './style.css';

function AssetCardProfile() {
  return (
    <div className='asset--profile--card--cont'>
        <div className='asset--profile--img--preview--cont' >
            {/* <img></img> */}
        </div>
        <h5 className='asset--profile--title'>Asset Title</h5>
        <p className='asset--profile--description'>description</p>
        <button className='asset--profile--button'><p>Previously Downloaded</p></button>
    </div>
  )
}

export default AssetCardProfile