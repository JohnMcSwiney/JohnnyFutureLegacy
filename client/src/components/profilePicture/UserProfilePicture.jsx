import React, { useState, useEffect } from 'react';
import './UserPfp.css'

const UserProfilePicture = ({ currentUserObject }) => {
  const [profilePictureUrl, setProfilePictureUrl] = useState(null);

//   useEffect(() => {
//     const fetchProfilePicture = async () => {
//       try {
//         const response = await fetch(`/api/user/${currentUserObject._id}/profile-picture`);
//         if (!response.ok) {
//           throw new Error('Failed to fetch profile picture');
//         }
//         const data = await response.json();
//         setProfilePictureUrl(data.profilePictureUrl);
//       } catch (error) {
//         console.error(error);
//         // Handle error
//       }
//     };

//     fetchProfilePicture();
//   }, [currentUserObject]);
// useEffect(()=>{
//     {currentUserObject &&
//         console.log('') 
//         {currentUserObject._id !== null &&
//         console.log(`http://localhost:5000/uploaded_files/${currentUserObject._id}/Banner/${currentUserObject.profilePicture}`)        
//         }
//     }
// },[])

  return (
    <div className={currentUserObject.isInstit? 'pfp--cont instit' : 'pfp--cont'}>
      {currentUserObject ? (
         <img src={`http://localhost:5000/uploaded_files/${currentUserObject._id}/Banner/${currentUserObject.profilePicture}`} alt={`Profile Picture`}/>
      ) : (
        <p>No profile picture available</p>
      )}
      <div className='imgCoveringCont'>
        .
      </div>
    </div>
  );
};

export default UserProfilePicture;
