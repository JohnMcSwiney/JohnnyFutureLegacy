import React, { useState, useEffect } from 'react';
import './UserPfp.css'
import API_BASE_URL from '../../apiConfig';

const UserProfilePicture = ({ currentUserObject, size }) => {
  const [profilePictureUrl, setProfilePictureUrl] = useState(null);

const [sizeVar, setSizeVar] = useState(1);
useEffect(()=>{
  
  if(!size){
    setSizeVar(1)
  } else {
    setSizeVar(size)
  }
// size 1 is 100 * 100 < default 
// size 2 is 50 * 50 < sidebar
// size 3 is 25 * 25 < featured collection

if(!currentUserObject){
  console.log('error');
  return(
    <div>...</div>
  )
}

},[])
  return (
    <div className={currentUserObject.isInstit? `pfp--cont instit--${sizeVar} pfp--size--${sizeVar}` : `pfp--cont pfp--size--${sizeVar}`}>
      {currentUserObject.profilePicture ? (
         <img src={`${API_BASE_URL}/uploaded_files/${currentUserObject._id}/Banner/${currentUserObject.profilePicture}`} alt={`Profile Picture`}/>
      ) : (
        <img src='https://firebasestorage.googleapis.com/v0/b/futurelegacy-test.appspot.com/o/FL_TempAssets%2FNoPfp.png?alt=media&token=6d1b8c8e-9687-4795-8bbc-9497ca23f26b' className='default--img--cont'/>
      )}
      <div className='imgCoveringCont'>
        .
      </div>
    </div>
  );
};

export default UserProfilePicture;
