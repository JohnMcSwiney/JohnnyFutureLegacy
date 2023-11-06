import React from 'react';

const ConfirmationPopup = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="popup-container">
      <div className="popup">
        <p>{message}</p>
        <button onClick={onCancel}>No</button>
        <button onClick={onConfirm}>Yes</button>  
      </div>
    </div>
  );
};

export default ConfirmationPopup;
