import React from 'react'

import './style.css'

export default function CollectionCard () {
  const tempImg =
    'https://media.cnn.com/api/v1/images/stellar/prod/210526205712-06-thai-lintels-san-francisco.jpg?q=w_1600,h_900,x_0,y_0,c_fill'
  const tempText =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore'

  return (
    <div className='home--coll--card--cont'>
      <div className='coll--card--img'>
        <img src={tempImg} />
      </div>
      <h2>Image title</h2>
      <div className='coll--card--text'>
        <p>{tempText}</p>
      </div>
      <button className='coll--card--btn'>
        View Collections
      </button>
    </div>
  )
}
