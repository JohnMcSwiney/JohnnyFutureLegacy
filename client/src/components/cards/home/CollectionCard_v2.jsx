import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
import { BsFillCollectionFill } from 'react-icons/bs'
import API_BASE_URL from '../../../apiConfig';
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
const [remadeName, setRemadeName] = useState('');
useEffect(()=>{
if(collectionIn){
  if(collectionIn.collectionImage !== null){
    try{
      let temp = collectionIn.collectionImage.replace(/http:\/\/localhost:5000/g, '');
      console.log(temp);
      setRemadeName(`${API_BASE_URL}${temp}`)
    } catch {

    }
    
  }
}
},[collectionIn])
console.log();
  return (
    <div
      className={toggleView ? 'coll--card--v2--cont card--v2--row' : 'coll--card--v2--cont '}
      onClick={handleRedirect}
    >
      {toggleView ? (
        <div className="coll--card--row--cont">
         
          <div className="coll--card--img--cont">
          <img src={remadeName} className='coll--card--img--1'/>
            <div className="coll--card--img--title--cont">
              
              <h2>{collectionIn.collectionName}</h2>
            </div>
          </div>
        </div>
      ) : (
        <div className="coll--card--v2">
          <div className="coll--card--v2--img">
            <img src={remadeName}/>
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
