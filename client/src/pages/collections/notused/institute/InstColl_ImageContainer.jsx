import React from 'react'
import './style.css'
import {useNavigate} from 'react-router-dom';

const InstColl_ImageContainer = ({ collectionid, parentid, imageUrl, collName }) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    console.log('i just got clicked, my id is: '+ collectionid +', my dads number is: ' + parentid);
    navigate(`/insti_collection/${parentid}/${collectionid}`)
  }
  
  return (
    <div className='instColl--img--cont--cont' onClick={() => handleClick()}>
      <div className='instColl--image-container'>
        <img className='instColl--image' src={imageUrl} alt='Image' />
      </div>
      <h4 className='instColl--name'>{collName}</h4>
    </div>
  )
}

export default InstColl_ImageContainer
