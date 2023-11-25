import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
import { BsFillCollectionFill } from 'react-icons/bs'
export default function CollectionCard_v2({ toggleView, collectionIn, collectionImg }) {
  const [userName, setUserName] = useState('');
  const [userImg, setUserImg] = useState('');
  const [userIsInstit, setUserIsInstit] = useState(false);
  const navigate = useNavigate();
//   console.log()
//   console.log(collectionIn)
  
  const handleRedirect = () => {
    if (collectionIn) {
      
      navigate(`/collection/${collectionIn._id}`);
    }
  };

  // const [hasImg, setHasImg] = useEffect(false);
//   useEffect(()=>{
// console.log('collectionImg', collectionIn.collectionImage)
//   },[])
  return (
    <div
      className={toggleView ? 'coll--card--v2--cont card--v2--row' : 'coll--card--v2--cont '}
      onClick={handleRedirect}
    >
      {toggleView ? (
        <div className="coll--card--row--cont">
         
          <div className="coll--card--img--cont">
          <img src={collectionIn.collectionImage} className='coll--card--img--1'/>
            <div className="coll--card--img--title--cont">
              
              <h2>{collectionIn.collectionName}</h2>
            </div>
          </div>
        </div>
      ) : (
        <div className="coll--card--v2">
          <div className="coll--card--v2--img">
            <img src={collectionIn.collectionImage}/>
            </div>
          <div className="coll--card--v2--title--cont">
          <BsFillCollectionFill />
              <h2 className='coll--card--v2--title'>{collectionIn.collectionName}</h2>
            </div>
        </div>
      )}
    </div>
  );
}
