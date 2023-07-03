import React from 'react'
import './style.css'
import {useNavigate} from 'react-router-dom';



const InstHomeColl_ImageContainer = ({collectionid, parentId, imageUrl, collName }) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    console.log('i just got clicked, my id is: '+ collectionid +', my dads number is: ' + parentid);
    navigate(`/insti_collection/${parentid}/${collectionid}`)
  }
  
  return (
    <div className='instHomeColl--img--cont--cont' onClick={() => handleClick()}>
      <div className='instHomeColl--image-cont'>
        <img className='instHomeColl--image' src={imageUrl} alt='Image' />
      </div>
      <h4 className='instHomeColl--name'>{collName}</h4>
    </div>
  )
}

export default InstHomeColl_ImageContainer
