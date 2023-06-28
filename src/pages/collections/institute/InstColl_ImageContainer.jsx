import React from 'react'
import './style.css'

const InstColl_ImageContainer = ({ imageUrl, collName }) => {
  return (
    <div className='instColl--img--cont--cont'>
      <div className='instColl--image-container'>
        <img className='instColl--image' src={imageUrl} alt='Image' />
      </div>
      <h4 className='instColl--name'>{collName}</h4>
    </div>
  )
}

export default InstColl_ImageContainer
