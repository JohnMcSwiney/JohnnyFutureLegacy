import React, { useEffect, useState } from 'react';
import './stylev2.css';
import { ImCross } from "react-icons/im";
import API_BASE_URL from '../../apiConfig';

const UpdateBioPopup = ({ userId, bioIn, onUpdateSuccess, onUpdateError, onClose }) => {
  const [newBio, setNewBio] = useState(null);
  useEffect(()=>{
    if(bioIn !== null){
        setNewBio(bioIn)
    }
    
  },[bioIn])
  const handleUpdateBio = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/user/${userId}/bio`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bio: newBio }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Update failed');
      }

      const responseData = await response.json();

      // Callback for successful update
      onUpdateSuccess(responseData);
    } catch (error) {
      // Callback for update error
      console.log(error.message)
      onUpdateError(error.message);
    }
  };

  const handleClose = () => {
    // Callback for closing the popup
    onClose('close');
  };

  return (
    <div className='popup--container'>
      <div className='popup'>
        <button className='popup--cancel--btn' onClick={handleClose}>
          <ImCross/>
        </button>
        <h2>Update Bio</h2>
        {newBio !== null &&
        <div className='FL_Input__text__2'>
          <h4>New Bio:</h4>
          <textarea value={newBio} onChange={(e) => setNewBio(e.target.value)} />
        </div>
        }
        
        <button className='FL_btn__2' onClick={handleUpdateBio}>
          Update Bio
        </button>
      </div>
    </div>
  );
};

export default UpdateBioPopup;